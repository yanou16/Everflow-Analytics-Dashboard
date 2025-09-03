import React from 'react';
import { TextField, Box, Button } from '@mui/material';
import { format } from 'date-fns';

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange, onSubmit }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
      <TextField
        label="Date de début"
        type="date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Date de fin"
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Appliquer
      </Button>
    </Box>
  );
};

export default DateRangePicker;