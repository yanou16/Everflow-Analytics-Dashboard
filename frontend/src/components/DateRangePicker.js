import React from 'react';
import { TextField, Box, Button, Paper, Typography, InputAdornment, useTheme } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FilterListIcon from '@mui/icons-material/FilterList';

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange, onSubmit }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  
  return (
    <Paper elevation={0} sx={{ 
      p: 2, 
      mb: 3, 
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 2,
      backgroundColor: theme.palette.background.paper
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        gap: 2, 
        alignItems: { xs: 'stretch', sm: 'center' }
      }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, minWidth: '120px' }}>
          <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Période d'analyse
        </Typography>
        
        <TextField
          label="Date de début"
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          InputLabelProps={{ 
            shrink: true,
            sx: { color: isDarkMode ? 'white' : undefined }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon color="primary" />
              </InputAdornment>
            ),
            sx: { 
              color: isDarkMode ? 'white' : undefined,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : undefined
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : undefined
              }
            }
          }}
          size="small"
          sx={{ flex: 1 }}
        />
        
        <TextField
          label="Date de fin"
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          InputLabelProps={{ 
            shrink: true,
            sx: { color: isDarkMode ? 'white' : undefined }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon color="primary" />
              </InputAdornment>
            ),
            sx: { 
              color: isDarkMode ? 'white' : undefined,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : undefined
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : undefined
              }
            }
          }}
          size="small"
          sx={{ flex: 1 }}
        />
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onSubmit}
          sx={{ 
            px: 3,
            py: 1,
            fontWeight: 500,
            boxShadow: 2
          }}
        >
          Appliquer
        </Button>
      </Box>
    </Paper>
  );
};

export default DateRangePicker;