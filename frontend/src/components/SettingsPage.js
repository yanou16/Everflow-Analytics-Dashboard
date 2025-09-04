import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Switch, FormControlLabel, Divider, Slider, Button, Grid, RadioGroup, Radio, FormControl, FormLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { blue, indigo, purple, pink, red, orange, amber, green, teal, cyan } from '@mui/material/colors';

const SettingsPage = ({ darkMode, primaryColor, accentColor, onUpdateTheme }) => {
  // États pour les différents paramètres
  const [localDarkMode, setLocalDarkMode] = useState(darkMode);
  const [localPrimaryColor, setLocalPrimaryColor] = useState(primaryColor);
  const [localAccentColor, setLocalAccentColor] = useState(accentColor);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [dateFormat, setDateFormat] = useState('yyyy-MM-dd');
  
  // Synchroniser les états locaux avec les props
  useEffect(() => {
    setLocalDarkMode(darkMode);
    setLocalPrimaryColor(primaryColor);
    setLocalAccentColor(accentColor);
  }, [darkMode, primaryColor, accentColor]);
  
  // Fonction pour gérer le changement de mode sombre/clair
  const handleDarkModeChange = (event) => {
    setLocalDarkMode(event.target.checked);
    // Appliquer immédiatement le changement de mode
    onUpdateTheme({ darkMode: event.target.checked });
  };
  
  // Palette de couleurs disponibles
  const colorOptions = [
    { name: 'Bleu', value: 'blue', color: blue[500] },
    { name: 'Indigo', value: 'indigo', color: indigo[500] },
    { name: 'Violet', value: 'purple', color: purple[500] },
    { name: 'Rose', value: 'pink', color: pink[500] },
    { name: 'Rouge', value: 'red', color: red[500] },
    { name: 'Orange', value: 'orange', color: orange[500] },
    { name: 'Ambre', value: 'amber', color: amber[500] },
    { name: 'Vert', value: 'green', color: green[500] },
    { name: 'Teal', value: 'teal', color: teal[500] },
    { name: 'Cyan', value: 'cyan', color: cyan[500] },
  ];
  
  // Fonction pour appliquer les paramètres
  const handleApplySettings = () => {
    // Appliquer tous les paramètres de thème
    onUpdateTheme({
      darkMode: localDarkMode,
      primaryColor: localPrimaryColor,
      accentColor: localAccentColor
    });
    
    // Afficher un message de confirmation
    alert('Paramètres appliqués !');
  };
  
  // Gérer les changements de couleur principale
  const handlePrimaryColorChange = (e) => {
    setLocalPrimaryColor(e.target.value);
  };
  
  // Gérer les changements de couleur d'accent
  const handleAccentColorChange = (e) => {
    setLocalAccentColor(e.target.value);
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.dark' }}>
        Paramètres
      </Typography>
      
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          Apparence
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={localDarkMode}
                onChange={handleDarkModeChange}
                color="primary"
              />
            }
            label="Mode sombre"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Activez le mode sombre pour réduire la fatigue oculaire lors de l'utilisation de l'application dans des environnements peu éclairés.
          </Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="h6" gutterBottom>
          Couleurs du thème
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="primary-color-label">Couleur principale</InputLabel>
              <Select
                labelId="primary-color-label"
                value={localPrimaryColor}
                label="Couleur principale"
                onChange={handlePrimaryColorChange}
              >
                {colorOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          bgcolor: option.color,
                          mr: 1 
                        }} 
                      />
                      {option.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="accent-color-label">Couleur d'accent</InputLabel>
              <Select
                labelId="accent-color-label"
                value={localAccentColor}
                label="Couleur d'accent"
                onChange={handleAccentColorChange}
              >
                {colorOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          bgcolor: option.color,
                          mr: 1 
                        }} 
                      />
                      {option.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={1} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 500 }}>
          Affichage des données
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography id="items-per-page-slider" gutterBottom>
            Éléments par page dans les tableaux: {itemsPerPage}
          </Typography>
          <Slider
            value={itemsPerPage}
            onChange={(e, newValue) => setItemsPerPage(newValue)}
            aria-labelledby="items-per-page-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={50}
          />
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography id="animation-speed-slider" gutterBottom>
            Vitesse d'animation des graphiques (ms): {animationSpeed}
          </Typography>
          <Slider
            value={animationSpeed}
            onChange={(e, newValue) => setAnimationSpeed(newValue)}
            aria-labelledby="animation-speed-slider"
            valueLabelDisplay="auto"
            step={100}
            marks
            min={0}
            max={2000}
          />
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Format de date</FormLabel>
          <RadioGroup
            row
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
          >
            <FormControlLabel value="yyyy-MM-dd" control={<Radio />} label="AAAA-MM-JJ" />
            <FormControlLabel value="dd/MM/yyyy" control={<Radio />} label="JJ/MM/AAAA" />
            <FormControlLabel value="MM/dd/yyyy" control={<Radio />} label="MM/JJ/AAAA" />
          </RadioGroup>
        </FormControl>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={handleApplySettings}
          sx={{ px: 4 }}
        >
          Appliquer les paramètres
        </Button>
      </Box>
    </Container>
  );
};

export default SettingsPage;