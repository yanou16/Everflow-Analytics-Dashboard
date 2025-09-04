import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Tab, Tabs, CircularProgress, Paper } from '@mui/material';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  
  // Dans votre composant Dashboard, modifiez le Container pour une meilleure mise en page
  
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 2,
        }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 600, 
              color: 'primary.dark',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Everflow Analytics Dashboard
          </Typography>
          
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onSubmit={handleDateSubmit}
          />
          
          <Paper elevation={0} sx={{ 
            borderRadius: 2, 
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
          }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    fontWeight: 500,
                    py: 2
                  },
                  '& .Mui-selected': {
                    fontWeight: 600
                  }
                }}
              >
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
                          title="Top 10 Profits par Affilié" 
                          entityType="affiliate" 
                          chartType="bar" 
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <ProfitChart 
                          data={[...affiliatesData]
                            .sort((a, b) => b.profit - a.profit)
                            .slice(0, 10)} 
                          title="Revenue vs Payout par Affilié" 
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
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;