import React from 'react';
import { Paper, Typography } from '@mui/material';

const DateWiseView = ({ selectedDoctor }) => {
  if (!selectedDoctor) return null;
  
  return (
    <Paper sx={{ mt: 3, p: 4, textAlign: 'center' }}>
      <Typography variant="h6" color="text.secondary">
        Date-wise view is under development
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        This view will allow setting specific dates for doctor availability
      </Typography>
    </Paper>
  );
};

export default DateWiseView;