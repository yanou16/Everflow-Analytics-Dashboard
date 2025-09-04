import React, { useState, useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import HelpPage from './components/HelpPage';
import SettingsPage from './components/SettingsPage';
import { blue, indigo, purple, pink, red, orange, amber, green, teal, cyan } from '@mui/material/colors';

// Mapping des couleurs Material-UI
const colorMap = {
  blue: blue,
  indigo: indigo,
  purple: purple,
  pink: pink,
  red: red,
  orange: orange,
  amber: amber,
  green: green,
  teal: teal,
  cyan: cyan
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('blue');
  const [accentColor, setAccentColor] = useState('amber');

  // Créer un thème dynamique basé sur les préférences
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
          main: colorMap[primaryColor][darkMode ? 300 : 700],
          light: colorMap[primaryColor][darkMode ? 200 : 500],
          dark: colorMap[primaryColor][darkMode ? 400 : 900],
        },
        secondary: {
          main: colorMap[accentColor][darkMode ? 300 : 500],
          light: colorMap[accentColor][darkMode ? 200 : 300],
          dark: colorMap[accentColor][darkMode ? 400 : 700],
        },
        background: {
          default: darkMode ? '#121212' : '#F8FAFC',
          paper: darkMode ? '#1E1E1E' : '#FFFFFF',
        },
        success: {
          main: darkMode ? '#4CAF50' : '#38A169',
        },
        error: {
          main: darkMode ? '#F44336' : '#E53E3E',
        },
      },
      typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
          fontWeight: 600,
        },
        h6: {
          fontWeight: 500,
        },
      },
      shape: {
        borderRadius: 8,
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 500,
            },
          },
        },
      },
    });
  }, [darkMode, primaryColor, accentColor]);

  // Fonction pour changer de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fonction pour mettre à jour les paramètres du thème
  const updateThemeSettings = (settings) => {
    if (settings.darkMode !== undefined) setDarkMode(settings.darkMode);
    if (settings.primaryColor) setPrimaryColor(settings.primaryColor);
    if (settings.accentColor) setAccentColor(settings.accentColor);
  };

  // Rendu conditionnel en fonction de la page actuelle
  const renderPage = () => {
    switch (currentPage) {
      case 'help':
        return <HelpPage />;
      case 'settings':
        return <SettingsPage 
          darkMode={darkMode} 
          primaryColor={primaryColor} 
          accentColor={accentColor} 
          onUpdateTheme={updateThemeSettings} 
        />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onPageChange={handlePageChange} currentPage={currentPage} />
      {renderPage()}
    </ThemeProvider>
  );
}

export default App;
