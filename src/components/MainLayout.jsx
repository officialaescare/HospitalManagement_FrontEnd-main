import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Tabs, 
  Tab, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Avatar,
  Stack,
  Tooltip
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  MedicalServices as MedicalIcon,
  Science as LabIcon,
  Medication as PharmacyIcon,
  LocalHospital,
  LocalHospital as IPIcon,
  Assessment as ReportsIcon,
  Event as AppointmentIcon,
  Person as DoctorIcon,
  PersonAdd as RegistrationIcon,
  EventBusy as MissedVisitsIcon,
  EventAvailable as ExpectedVisitsIcon,
  Sms as SmsIcon,
  People as PatientsIcon,
  Settings as SettingsIcon,
  AccessTime as TimeIcon,
  Notifications as NotificationsIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Mock data for sidebar items based on selected top tab
const sidebarItems = {
  dashboard: [
    { text: 'Overview', icon: <DashboardIcon />, path: '/' },
    { text: 'Statistics', icon: <AssessmentIcon />, path: '/dashboard/statistics' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/dashboard/notifications' }
  ],
  appointment: [
    { text: 'Appointments', icon: <AppointmentIcon />, path: '/booking' },
    { text: 'Doctor Availability', icon: <CalendarIcon />, path: '/doctor-availability' },  
    { text: 'Patients', icon: <PatientsIcon />, path: '/patients' }  ,
    { text: 'Missed Visits', icon: <MissedVisitsIcon />, path: '/missed-visits' },
    { text: 'Expected Visits', icon: <ExpectedVisitsIcon />, path: '/expected-visits' },
    { text: 'Patient SMS', icon: <SmsIcon />, path: '/patient-sms' },
    { text: 'Doctor SMS', icon: <SmsIcon />, path: '/doctor-sms' },
    
  ],
  emr: [
    { text: 'Patient Records', icon: <MedicalIcon />, path: '/emr/records' },
    { text: 'Medical History', icon: <MedicalIcon />, path: '/emr/history' },
    { text: 'Prescriptions', icon: <MedicalIcon />, path: '/emr/prescriptions' }
  ],
  lab: [
    { text: 'Test Orders', icon: <LabIcon />, path: '/lab/orders' },
    { text: 'Test Results', icon: <LabIcon />, path: '/lab/results' },
    { text: 'Lab Inventory', icon: <LabIcon />, path: '/lab/inventory' }
  ],
  pharmacy: [
    { text: 'Medications', icon: <PharmacyIcon />, path: '/pharmacy/medications' },
    { text: 'Prescriptions', icon: <PharmacyIcon />, path: '/pharmacy/prescriptions' },
    { text: 'Inventory', icon: <PharmacyIcon />, path: '/pharmacy/inventory' }
  ],
  ip: [
    { text: 'Inpatients', icon: <IPIcon />, path: '/ip/inpatients' },
    { text: 'Rooms', icon: <IPIcon />, path: '/ip/rooms' },
    { text: 'Admissions', icon: <IPIcon />, path: '/ip/admissions' }
  ],
  reports: [
    { text: 'Financial', icon: <ReportsIcon />, path: '/reports/financial' },
    { text: 'Operational', icon: <ReportsIcon />, path: '/reports/operational' },
    { text: 'Clinical', icon: <ReportsIcon />, path: '/reports/clinical' }
  ]
};

const drawerWidth = 240;
const topBarHeight = 64; // Height of the top navigation bar
const mainNavHeight = 64; // Height of the main navigation bar

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [loginTime] = useState(new Date().toLocaleTimeString());
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 60000);
    
    // Set initial time
    setCurrentTime(new Date().toLocaleTimeString());
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Determine which tab should be active based on the current path
  const getActiveTabFromPath = (path) => {
    if (path === '/' || path.startsWith('/dashboard')) return 'dashboard';
    if (path.startsWith('/booking') || 
        path.startsWith('/doctor-availability') ||  
        path.startsWith('/appointment/patient-registration') ||       
        path.startsWith('/missed-visits') || 
        path.startsWith('/expected-visits') || 
        path.startsWith('/patient-sms') || 
        path.startsWith('/doctor-sms') || 
        path.startsWith('/patients')) return 'appointment';
    if (path.startsWith('/emr')) return 'emr';
    if (path.startsWith('/lab')) return 'lab';
    if (path.startsWith('/pharmacy')) return 'pharmacy';
    if (path.startsWith('/ip')) return 'ip';
    if (path.startsWith('/reports')) return 'reports';
    return 'dashboard'; // Default to dashboard
  };
  
  const [selectedTab, setSelectedTab] = useState(getActiveTabFromPath(location.pathname));
  
  // Update selected tab when location changes
  React.useEffect(() => {
    setSelectedTab(getActiveTabFromPath(location.pathname));
  }, [location.pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    
    // Navigate to the first item in the sidebar for the selected tab
    if (sidebarItems[newValue] && sidebarItems[newValue].length > 0) {
      navigate(sidebarItems[newValue][0].path);
    }
  };

  // Custom theme for the AppBar
  const topBarStyle = {
    backgroundColor: '#2e7d32', // Darker green for top bar
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)' // Stronger shadow for top bar
  };
  
  const mainNavStyle = {
    backgroundColor: '#4CAF50', // Green color
    color: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)' // Lighter shadow for main nav
  };

  const drawer = (
    <div>
      <Toolbar sx={{ 
        backgroundColor: '#4CAF50', 
        color: 'white',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Typography variant="h6" noWrap component="div" sx={{ 
          display: 'flex', 
          alignItems: 'center',
          fontWeight: 'bold'
        }}>
          <LocalHospital sx={{ mr: 1 }} />
          HMS
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {sidebarItems[selectedTab]?.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={Link} 
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: '4px',
              mx: 1,
              mb: 0.5,
              transition: 'all 0.2s ease-in-out',
              '&.Mui-selected': {
                backgroundColor: '#E8F5E9', // Light green background for selected item
                color: '#4CAF50', // Green text for selected item
                borderLeft: '4px solid #4CAF50', // Green left border for emphasis
                '&:hover': {
                  backgroundColor: '#E8F5E9',
                },
              },
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.08)', // Very light green on hover
              }
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? '#4CAF50' : 'inherit',
              minWidth: '40px' // Slightly smaller to make text align better
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation Bar with Profile, Login Time, Hospital Logo, and Settings */}
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          ...topBarStyle,
          height: topBarHeight
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: topBarHeight }}>
          {/* Hospital Logo and Name */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalHospital sx={{ mr: 1, fontSize: 32 }} />
            <Typography variant="h5" noWrap component="div">
              Hospital Management System
            </Typography>
          </Box>
          
          {/* Right side items: Login Time, Settings, Profile */}
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Login Time */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TimeIcon sx={{ mr: 1 }} />
              <Box>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  Login Time
                </Typography>
                <Typography variant="body2">
                  {loginTime}
                </Typography>
              </Box>
            </Box>
            
            {/* Current Time */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Typography variant="caption" sx={{ display: 'block' }}>
                  Current Time
                </Typography>
                <Typography variant="body2">
                  {currentTime}
                </Typography>
              </Box>
            </Box>
            
            {/* Settings */}
            <Tooltip title="Settings">
              <IconButton color="inherit">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            
            {/* Profile */}
            <Tooltip title="Profile">
              <Avatar 
                alt="User Profile" 
                src="/static/images/avatar/1.jpg" 
                sx={{ 
                  width: 40, 
                  height: 40,
                  cursor: 'pointer',
                  border: '2px solid white'
                }} 
              />
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
      
      {/* Main Navigation Bar with Tabs */}
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          top: topBarHeight,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          ...mainNavStyle,
          height: mainNavHeight
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* HMS Short Logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: 'flex', alignItems: 'center', mr: 4 }}
          >
            <LocalHospital sx={{ mr: 1 }} />
            HMS
          </Typography>
          
          {/* Main Navigation Tabs */}
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ 
              '& .MuiTab-root': { 
                minWidth: 'auto',
                color: 'white',
                opacity: 0.7,
                padding: '6px 16px',
                transition: 'all 0.2s ease-in-out',
                '&.Mui-selected': {
                  opacity: 1,
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)', // Darker background for selected tab
                  borderRadius: '4px 4px 0 0', // Rounded top corners
                  boxShadow: 'inset 0 3px 0 #fff' // White line on top for additional emphasis
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slight background on hover
                  opacity: 0.9
                }
              },
              '& .MuiTabs-indicator': {
                height: 3, // Thicker indicator
                backgroundColor: '#fff' // White indicator
              }
            }}
          >
            <Tab label="Dashboard" value="dashboard" />
            <Tab label="Appointment" value="appointment" />
            <Tab label="EMR" value="emr" />
            <Tab label="LAB" value="lab" />
            <Tab label="Pharmacy" value="pharmacy" />
            <Tab label="IP" value="ip" />
            <Tab label="Reports" value="reports" />
          </Tabs>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ display: 'flex', pt: `${topBarHeight + mainNavHeight}px` }}>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                marginTop: `${topBarHeight + mainNavHeight}px`
              },
            }}
          >
            {drawer}
          </Drawer>
          
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                marginTop: `${topBarHeight + mainNavHeight}px`, // Combined AppBar heights
                height: `calc(100% - ${topBarHeight + mainNavHeight}px)`
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            width: { md: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;