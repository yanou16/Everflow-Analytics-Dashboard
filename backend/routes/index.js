const express = require('express');
const router = express.Router();

// Importer les routes
const offersRoutes = require('./offers');
const affiliatesRoutes = require('./affiliates');
const advertisersRoutes = require('./advertisers');

// Utiliser les routes
router.use('/profits/offers', offersRoutes);
router.use('/profits/affiliates', affiliatesRoutes);
router.use('/profits/advertisers', advertisersRoutes);

// Route de test
router.get('/test', (req, res) => {
  res.json({ message: 'Backend Everflow Analytics fonctionne!' });
});

module.exports = router;