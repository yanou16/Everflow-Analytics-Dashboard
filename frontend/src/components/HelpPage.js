import React from 'react';
import { Container, Typography, Paper, Box, Divider, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DateRangeIcon from '@mui/icons-material/DateRange';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import HelpIcon from '@mui/icons-material/Help';

const HelpPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.dark' }}>
        Aide et Documentation
      </Typography>
      
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          À propos de l'application
        </Typography>
        <Typography paragraph>
          Everflow Analytics Dashboard est une application web qui vous permet de visualiser les performances 
          de vos campagnes marketing en affichant les profits par offre, affilié et annonceur. 
          L'application se connecte à l'API Everflow pour récupérer les données en temps réel.
        </Typography>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          Comprendre les métriques
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <TrendingUpIcon color="success" />
            </ListItemIcon>
            <ListItemText 
              primary="Revenu" 
              secondary="Le montant total généré par les conversions. C'est l'argent que vous recevez des annonceurs pour les conversions réalisées."
            />
          </ListItem>
          
          <Divider variant="inset" component="li" />
          
          <ListItem>
            <ListItemIcon>
              <AccountBalanceWalletIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Payout" 
              secondary="Le montant versé aux affiliés pour les conversions qu'ils ont générées. C'est votre coût pour acquérir ces conversions."
            />
          </ListItem>
          
          <Divider variant="inset" component="li" />
          
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Profit" 
              secondary="La différence entre le revenu et le payout (Revenu - Payout). C'est votre bénéfice net sur les conversions."
            />
          </ListItem>
        </List>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          Comment utiliser l'application
        </Typography>
        
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <DateRangeIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="subtitle1" fontWeight={500}>Sélection de dates</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Utilisez le sélecteur de dates en haut du tableau de bord pour définir la période d'analyse. 
              Sélectionnez une date de début et une date de fin, puis cliquez sur "Appliquer" pour mettre à jour les données.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <BarChartIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="subtitle1" fontWeight={500}>Graphiques à barres</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Les graphiques à barres montrent les profits pour chaque entité (offre, affilié ou annonceur). 
              Les entités sont classées par profit décroissant, avec les plus performantes en haut.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PieChartIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="subtitle1" fontWeight={500}>Graphiques empilés</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Les graphiques empilés montrent à la fois le revenu et le payout pour chaque entité, 
              vous permettant de visualiser la répartition entre ces deux métriques et de comprendre 
              d'où vient votre profit.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          FAQ
        </Typography>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HelpIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="subtitle1" fontWeight={500}>Pourquoi certaines données peuvent-elles être manquantes ?</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Les données affichées proviennent de l'API Everflow et sont limitées à la période sélectionnée. 
              Si aucune conversion n'a été enregistrée pour une entité pendant cette période, 
              elle n'apparaîtra pas dans les graphiques ou tableaux.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HelpIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="subtitle1" fontWeight={500}>Comment sont calculés les profits ?</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Les profits sont calculés en soustrayant le payout du revenu pour chaque entité. 
              Seules les conversions approuvées sont prises en compte dans ces calculs.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Container>
  );
};

export default HelpPage;