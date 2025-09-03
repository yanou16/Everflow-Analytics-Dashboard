import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tab, Tabs, CircularProgress } from '@mui/material';
import { format, subDays } from 'date-fns';
import DateRangePicker from './DateRangePicker';
import ProfitChart from './ProfitChart';
import DataTable from './DataTable';
import { fetchOffersProfits, fetchAffiliatesProfits, fetchAdvertisersProfits } from '../services/api';

const Dashboard = () => {
  // État pour les dates
  const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  // État pour les données
  const [offersData, setOffersData] = useState([]);
  const [affiliatesData, setAffiliatesData] = useState([]);
  const [advertisersData, setAdvertisersData] = useState([]);
  
  // État pour l'onglet actif
  const [activeTab, setActiveTab] = useState(0);
  
  // État pour le chargement
  const [loading, setLoading] = useState(false);
  
  // Fonction pour charger les données
  const loadData = async () => {
    setLoading(true);
    try {
      const [offers, affiliates, advertisers] = await Promise.all([
        fetchOffersProfits(startDate, endDate),
        fetchAffiliatesProfits(startDate, endDate),
        fetchAdvertisersProfits(startDate, endDate)
      ]);
      
      setOffersData(offers);
      setAffiliatesData(affiliates);
      setAdvertisersData(advertisers);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Charger les données au montage du composant
  useEffect(() => {
    loadData();
  }, []);
  
  // Gérer le changement d'onglet
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Gérer la soumission du formulaire de dates
  const handleDateSubmit = () => {
    loadData();
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Everflow Analytics Dashboard</Typography>
      
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSubmit={handleDateSubmit}
      />
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Offres" />
          <Tab label="Affiliés" />
          <Tab label="Annonceurs" />
        </Tabs>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {activeTab === 0 && (
            <>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <ProfitChart 
                    data={[...offersData]
                      .sort((a, b) => b.profit - a.profit)
                      .slice(0, 15)} 
                    title="Top 15 Profits par Offre ($)" 
                    entityType="offer" 
                    chartType="bar" 
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <ProfitChart 
                    data={[...offersData]
                      .sort((a, b) => b.profit - a.profit)
                      .slice(0, 15)} 
                    title="Revenue et Payout par Offre ($)" 
                    entityType="offer" 
                    chartType="stacked" 
                  />
                </Box>
              </Box>
              <DataTable 
                data={offersData} 
                title="Détails des Profits par Offre" 
                entityType="offer" 
              />
            </>
          )}
          
          {activeTab === 1 && (
            <>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <ProfitChart 
                    data={[...affiliatesData]
                      .sort((a, b) => b.profit - a.profit)
                      .slice(0, 10)} 
                    title="Top 10 Profits par Affilié ($)" 
                    entityType="affiliate" 
                    chartType="bar" 
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <ProfitChart 
                    data={[...affiliatesData]
                      .sort((a, b) => b.profit - a.profit)
                      .slice(0, 10)} 
                    title="Top 10 Revenue et Payout par Affilié ($)" 
                    entityType="affiliate" 
                    chartType="stacked" 
                  />
                </Box>
              </Box>
              <DataTable 
                data={affiliatesData} 
                title="Détails des Profits par Affilié" 
                entityType="affiliate" 
              />
            </>
          )}
          
          {activeTab === 2 && (
            <>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
                <Box sx={{ flex: 1 }}>
                  <ProfitChart 
                    data={[...advertisersData]
                      .sort((a, b) => b.profit - a.profit)
                      .slice(0, 10)} 
                    title="Top 10 Annonceurs par Profit ($)" 
                    entityType="advertiser" 
                    chartType="bar" 
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <ProfitChart 
                    data={[...advertisersData]
                      .sort((a, b) => b.profit - a.profit)
                      .slice(0, 10)} 
                    title="Top 10 Revenue et Payout par Annonceur ($)" 
                    entityType="advertiser" 
                    chartType="stacked" 
                  />
                </Box>
              </Box>
              <DataTable 
                data={advertisersData} 
                title="Détails des Profits par Annonceur" 
                entityType="advertiser" 
              />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;