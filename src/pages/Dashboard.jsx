import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  LocalHospital as HospitalIcon,
  Science as LabIcon,
  Medication as PharmacyIcon,
  Assessment as ReportsIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E8F5E9', color: '#388E3C' }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                15
              </Typography>
              <Typography variant="body2">
                Today's Appointments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#E3F2FD', color: '#1976D2' }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                8
              </Typography>
              <Typography variant="body2">
                New Patients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFF8E1', color: '#FF8F00' }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                $2,500
              </Typography>
              <Typography variant="body2">
                Today's Revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#FFEBEE', color: '#D32F2F' }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                12
              </Typography>
              <Typography variant="body2">
                Pending Bills
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        {/* Quick Access Cards */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Quick Access
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="div">
                        Appointments
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Manage patient appointments
                    </Typography>
                    <Button 
                      component={Link} 
                      to="/booking" 
                      variant="contained" 
                      color="primary"
                      fullWidth
                    >
                      Go to Appointments
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PeopleIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="div">
                        Patients
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Manage patient records
                    </Typography>
                    <Button 
                      component={Link} 
                      to="/patients" 
                      variant="contained" 
                      color="primary"
                      fullWidth
                    >
                      Go to Patients
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LabIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="div">
                        Lab
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Manage lab tests and results
                    </Typography>
                    <Button 
                      component={Link} 
                      to="/lab/orders" 
                      variant="contained" 
                      color="primary"
                      fullWidth
                    >
                      Go to Lab
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PharmacyIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="div">
                        Pharmacy
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Manage medications and prescriptions
                    </Typography>
                    <Button 
                      component={Link} 
                      to="/pharmacy/medications" 
                      variant="contained" 
                      color="primary"
                      fullWidth
                    >
                      Go to Pharmacy
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <HospitalIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="div">
                        Inpatient
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Manage inpatient admissions
                    </Typography>
                    <Button 
                      component={Link} 
                      to="/ip/inpatients" 
                      variant="contained" 
                      color="primary"
                      fullWidth
                    >
                      Go to Inpatient
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ReportsIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="div">
                        Reports
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      View and generate reports
                    </Typography>
                    <Button 
                      component={Link} 
                      to="/reports/financial" 
                      variant="contained" 
                      color="primary"
                      fullWidth
                    >
                      Go to Reports
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Activity and Notifications */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <EventIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="New appointment scheduled" 
                  secondary="John Smith - 10:30 AM"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PeopleIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="New patient registered" 
                  secondary="Sarah Johnson - 9:15 AM"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ReceiptIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Payment received" 
                  secondary="Invoice #1234 - $150"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LabIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Lab results ready" 
                  secondary="Michael Brown - Blood Test"
                />
              </ListItem>
            </List>
          </Paper>
          
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Notifications
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Low medication stock" 
                  secondary="Amoxicillin - 10 units left"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotificationsIcon color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Appointment reminder" 
                  secondary="Dr. Meeting at 2:00 PM"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingUpIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Revenue increased by 15%" 
                  secondary="Compared to last week"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;