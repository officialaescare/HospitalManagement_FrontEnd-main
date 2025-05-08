import React from 'react';
import { Box, Typography, Paper, Card, CardContent, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

const PlaceholderPage = () => {
  const location = useLocation();
  const path = location.pathname;
  
  // Extract page title from path
  const getPageTitle = () => {
    const pathSegments = path.split('/').filter(segment => segment);
    
    if (pathSegments.length === 0) return 'Dashboard';
    
    // Convert path to title (e.g., 'patient-registration' -> 'Patient Registration')
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {getPageTitle()}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          This is a placeholder for the {getPageTitle()} page
        </Typography>
        <Typography variant="body1" paragraph>
          This section would contain the actual content for {getPageTitle()}.
          Currently, this is just a placeholder to demonstrate the navigation structure.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Path: {path}
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sample Card {item}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a placeholder card that would contain actual data in the real application.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlaceholderPage;