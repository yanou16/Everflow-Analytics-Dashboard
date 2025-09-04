import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Avatar, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const Header = ({ onPageChange, currentPage }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ 
      borderBottom: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
      mb: 2 
    }}>
      <Toolbar>
        {/* Logo et nom */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => onPageChange('dashboard')}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>E</Avatar>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            Everflow Analytics
          </Typography>
        </Box>
        
        {/* Espace flexible */}
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Navigation */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            startIcon={<DashboardIcon />} 
            color={currentPage === 'dashboard' ? 'primary' : 'inherit'}
            onClick={() => onPageChange('dashboard')}
          >
            Dashboard
          </Button>
          <Button 
            startIcon={<SettingsIcon />} 
            color={currentPage === 'settings' ? 'primary' : 'inherit'}
            onClick={() => onPageChange('settings')}
          >
            Paramètres
          </Button>
          <Button 
            startIcon={<HelpOutlineIcon />} 
            color={currentPage === 'help' ? 'primary' : 'inherit'}
            onClick={() => onPageChange('help')}
            sx={{
              color: currentPage === 'help' ? 'primary.main' : (isDarkMode ? 'white' : 'inherit')
            }}
          >
            Aide
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;