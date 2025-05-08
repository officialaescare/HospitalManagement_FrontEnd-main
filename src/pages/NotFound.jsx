import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { SentimentVeryDissatisfied as SadIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 500,
          borderTop: '8px solid #4CAF50',
          borderRadius: '8px'
        }}
      >
        <SadIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
        <Typography variant="h1" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ 
            bgcolor: '#4CAF50',
            '&:hover': {
              bgcolor: '#388E3C',
            },
            px: 4,
            py: 1
          }}
        >
          Go to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;