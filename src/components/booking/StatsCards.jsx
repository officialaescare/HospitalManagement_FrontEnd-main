import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography 
} from '@mui/material';

const StatsCards = ({ statsData }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={6} sm={4} md={2}>
        <Card sx={{ bgcolor: '#E8F5E9', color: '#388E3C' }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {statsData?.booked || 0}
            </Typography>
            <Typography variant="body2">
              Booked
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Card sx={{ bgcolor: '#E3F2FD', color: '#1976D2' }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {statsData?.reviewed || 0}
            </Typography>
            <Typography variant="body2">
              Reviewed
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Card sx={{ bgcolor: '#FFEBEE', color: '#D32F2F' }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {statsData?.cancelled || 0}
            </Typography>
            <Typography variant="body2">
              Cancelled
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Card sx={{ bgcolor: '#E0F7FA', color: '#0097A7' }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {statsData?.completed || 0}
            </Typography>
            <Typography variant="body2">
              Completed
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Card sx={{ bgcolor: '#F5F5F5', color: '#616161' }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {statsData?.total || 0}
            </Typography>
            <Typography variant="body2">
              Total
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatsCards;