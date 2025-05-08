import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const PageHeader = ({ title, onAddNew }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4">
        {title}
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddNew}
        sx={{ 
          bgcolor: '#4CAF50',
          '&:hover': {
            bgcolor: '#388E3C',
          }
        }}
      >
        Add New Patient
      </Button>
    </Box>
  );
};

export default PageHeader;