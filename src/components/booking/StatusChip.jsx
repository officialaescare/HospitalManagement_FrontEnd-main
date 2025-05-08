import React from 'react';
import { Chip } from '@mui/material';

const StatusChip = ({ status }) => {
  let color = 'primary';
  let bgcolor = '#E8F5E9'; // Light green background
  let textColor = '#388E3C'; // Dark green text
  
  switch (status) {
    case 'Booked':
      color = 'primary';
      bgcolor = '#E8F5E9'; // Light green
      textColor = '#388E3C'; // Dark green
      break;
    case 'Reviewed':
      color = 'success';
      bgcolor = '#E3F2FD'; // Light blue
      textColor = '#1976D2'; // Blue
      break;
    case 'Cancelled':
      color = 'error';
      bgcolor = '#FFEBEE'; // Light red
      textColor = '#D32F2F'; // Red
      break;
    case 'Completed':
      color = 'info';
      bgcolor = '#E0F7FA'; // Light cyan
      textColor = '#0097A7'; // Cyan
      break;
    default:
      color = 'default';
      bgcolor = '#F5F5F5'; // Light gray
      textColor = '#757575'; // Gray
  }
  
  return (
    <Chip 
      label={status} 
      size="small" 
      sx={{ 
        bgcolor: bgcolor,
        color: textColor,
        fontWeight: 'medium',
        '& .MuiChip-label': { px: 1 }
      }} 
    />
  );
};

export default StatusChip;