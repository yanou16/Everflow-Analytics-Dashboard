const express = require('express');
const axios = require('axios');
const router = express.Router();
const { EVERFLOW_API_BASE, getAuthHeaders } = require('../config/everflow');

// Profits par offre
router.get('/', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'Les paramètres start_date et end_date sont requis' });
    }

    const response = await axios.post(`${EVERFLOW_API_BASE}/networks/reporting/entity/table`, {
      from: start_date,
      to: end_date,
      timezone_id: 67, // UTC
      currency_id: "USD",
      columns: [
        { column: "offer" }
      ],
      query: {
        filters: [
          // Ajouter un filtre pour inclure uniquement les conversions approuvées
          { field: "conversion_status", operator: "EQUALS", value: "approved" }
        ]
      }
    }, { headers: getAuthHeaders() });

    // Vérifier si table existe dans la réponse
    if (!response.data.table || !Array.isArray(response.data.table)) {
      console.error('La propriété table est manquante ou n\'est pas un tableau:', response.data);
      return res.status(500).json({ error: 'Format de réponse API inattendu' });
    }

    const offerData = response.data.table.reduce((acc, row) => {
      // Extraire l'ID et le nom de l'offre à partir du tableau columns
      const offerColumn = row.columns?.find(col => col.column_type === 'offer');
      if (!offerColumn) return acc;
      
      const id = offerColumn.id;
      const name = offerColumn.label;
      
      // Extraire les métriques de l'objet reporting
      const payout = parseFloat(row.reporting?.payout || 0);
      const revenue = parseFloat(row.reporting?.revenue || 0);
      const profit = revenue - payout;

      if (!acc[id]) {
        acc[id] = { offer_id: id, offer_name: name, payout: 0, revenue: 0, profit: 0 };
      }
      acc[id].payout += payout;
      acc[id].revenue += revenue;
      acc[id].profit += profit;
      return acc;
    }, {});

    res.json(Object.values(offerData));
  } catch (error) {
    console.error('Erreur API Everflow:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Erreur lors de la récupération des données Everflow',
      details: error.response?.data || error.message
    });
  }
});

module.exports = router;