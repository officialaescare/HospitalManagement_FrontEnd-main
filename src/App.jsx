// Main App
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/appointment/BookingPage';
import PlaceholderPage from './pages/PlaceholderPage';
import NotFound from './pages/NotFound';

// Import specific pages
import DoctorAvailabilityPage from './pages/appointment/DoctorAvailabilityPage';
import PatientRegistrationPage from './pages/appointment/PatientRegistrationPage';
import PatientRecordsPage from './pages/emr/PatientRecordsPage';
import PatientsPage from './pages/appointment/PatientsPage';

// Create a theme with green and white colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Green
      light: '#E8F5E9', // Light green
      dark: '#388E3C', // Dark green
    },
    secondary: {
      main: '#FFFFFF', // White
    },
    background: {
      default: '#F5F5F5', // Light gray background
      paper: '#FFFFFF', // White paper
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#4CAF50', // Green app bar
        },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        {/* Dashboard Routes */}
        <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/dashboard/statistics" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/dashboard/notifications" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        
        {/* Appointment Routes */}
        <Route path="/booking" element={<MainLayout><BookingPage /></MainLayout>} />
        <Route path="/doctor-calendar" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/doctor-availability" element={<MainLayout><DoctorAvailabilityPage /></MainLayout>} />
        <Route path="/appointment/patient-registration" element={<MainLayout><PatientRegistrationPage /></MainLayout>} />
        <Route path="/appointment/patient-registration/:id" element={<MainLayout><PatientRegistrationPage /></MainLayout>} />
        <Route path="/missed-visits" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/expected-visits" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/patient-sms" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/doctor-sms" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/patients" element={<MainLayout><PatientsPage /></MainLayout>} />
        
        {/* EMR Routes */}
        <Route path="/emr/records" element={<MainLayout><PatientRecordsPage /></MainLayout>} />
        <Route path="/emr/patient-records/:id" element={<MainLayout><PatientRecordsPage /></MainLayout>} />
        <Route path="/emr/history" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/emr/prescriptions" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        
        {/* LAB Routes */}
        <Route path="/lab/orders" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/lab/results" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/lab/inventory" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        
        {/* Pharmacy Routes */}
        <Route path="/pharmacy/medications" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/pharmacy/prescriptions" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/pharmacy/inventory" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        
        {/* IP Routes */}
        <Route path="/ip/inpatients" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/ip/rooms" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/ip/admissions" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        
        {/* Reports Routes */}
        <Route path="/reports/financial" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/reports/operational" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        <Route path="/reports/clinical" element={<MainLayout><PlaceholderPage /></MainLayout>} />
        
        {/* Error Routes */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;