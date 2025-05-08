import React from 'react';
import { Button, Typography } from '@mui/material';

const BillingChip = ({ status, onClick }) => {
  if (status === 'N/A') return <Typography variant="body2">N/A</Typography>;
  
  const isCompleted = status === 'Completed';
  
  return (
    <Button 
      variant="contained" 
      size="small" 
      onClick={(e) => {
        e.stopPropagation(); // Prevent row click event
        if (onClick) onClick(e);
      }}
      sx={{ 
        bgcolor: isCompleted ? '#4CAF50' : '#FF9800',
        '&:hover': {
          bgcolor: isCompleted ? '#388E3C' : '#F57C00',
        },
        px: 2,
        py: 0.5,
        minWidth: 'auto'
      }}
    >
      {isCompleted ? 'Paid' : 'Bill'}
    </Button>
  );
};

export default BillingChip;