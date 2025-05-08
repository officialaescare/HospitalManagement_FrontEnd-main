import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { format } from 'date-fns';
import { useAppointments } from '../../hooks/useAppointmentQueries';
import { useDoctors } from '../../hooks/useDoctorQueries';

// Import components
import { 
  TabPanel, 
  DoctorSelector, 
  DateFilter, 
  SearchFilters, 
  StatsCards, 
  AppointmentsTable,
  AppointmentBookingModal
} from '../../components/booking';
import { BillingForm } from '../../components/billing';

// Main BookingPage Component
const BookingPage = () => {
  // State for tabs
  const [mainTabValue, setMainTabValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState(0);
  
  // State for filters
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctorSpecialization, setDoctorSpecialization] = useState('');
  const [filters, setFilters] = useState({
    patientId: '',
    patientName: '',
    tokenNo: '',
    doctorId: '',
  });
  
  // State for forms
  const [billingOpen, setBillingOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Fetch doctors data
  const { data: doctorsData, isLoading: isLoadingDoctors } = useDoctors();
  
  // Fetch appointments data using the getAppointmentByDoctorId endpoint
  const { data: appointmentsData, isLoading } = useAppointments({
    date: format(selectedDate, 'yyyy-MM-dd'),
    doctorId: filters.doctorId || selectedDoctor
  });
  
  // Stats data is now included in the appointments response
  const statsData = appointmentsData?.stats;
  
  // Update doctor specialization when doctor changes
  useEffect(() => {
    if (selectedDoctor && doctorsData?.data) {
      const doctor = doctorsData.data.find(doc => doc.doctorId === parseInt(selectedDoctor));
      if (doctor) {
        setDoctorSpecialization(doctor.specialization);
        setFilters(prev => ({ ...prev, doctorId: doctor.doctorId }));
      }
    } else {
      setDoctorSpecialization('');
    }
  }, [selectedDoctor, doctorsData]);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle doctor selection
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    setSelectedDoctor(doctorId);
  };
  
  // Handle row click
  const handleRowClick = (appointment) => {
    console.log('Appointment clicked:', appointment);
    
    // If it's an empty slot, open the booking dialog
    if (appointment.isEmpty) {
      console.log('Opening booking dialog for empty slot:', appointment);
      // Open the booking modal
      setSelectedAppointment(appointment);
      setBookingOpen(true);
    } else {
      // For existing appointments, show details
      console.log('Showing details for existing appointment:', appointment);
      
      // Set the selected appointment and open the billing form
      setSelectedAppointment(appointment);
      setBillingOpen(true);
    }
  };
  
  // Handle action buttons
  const handleQuickEntry = (id, e) => {
    e.stopPropagation();
    
    // Find the appointment by id
    const appointment = appointmentsData?.appointments.find(app => app.id === id);
    
    if (appointment?.isEmpty) {
      console.log('Booking new appointment for empty slot:', appointment);
      setSelectedAppointment(appointment);
      setBookingOpen(true);
    } else {
      console.log('Quick Entry for:', id);
      setSelectedAppointment(appointment);
      setBillingOpen(true);
    }
  };
  
  const handleEdit = (id, e) => {
    e.stopPropagation();
    console.log('Edit appointment:', id);
  };
  
  const handleDelete = (id, e) => {
    e.stopPropagation();
    console.log('Delete appointment:', id);
  };
  
  const handlePrint = (id, e) => {
    e.stopPropagation();
    console.log('Print appointment:', id);
  };
  
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Appointment Management
      </Typography>
      
      {/* Doctor Selection Component */}
      <DoctorSelector 
        selectedDoctor={selectedDoctor}
        doctorSpecialization={doctorSpecialization}
        handleDoctorChange={handleDoctorChange}
        doctorsData={doctorsData}
        isLoadingDoctors={isLoadingDoctors}
      />
      
      {/* Main Content */}
      <TabPanel value={mainTabValue} index={0}>
        <TabPanel value={subTabValue} index={0}>
          {/* Filters and Stats Row */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Date Filter Component */}
            <DateFilter 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            
            {/* Search Filters Component */}
            <SearchFilters 
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          </Grid>
          
          {/* Statistics Cards Component */}
          <StatsCards statsData={statsData} />
          
          {/* Appointments Table Component */}
          <AppointmentsTable 
            appointmentsData={appointmentsData}
            isLoading={isLoading}
            handleRowClick={handleRowClick}
            handleQuickEntry={handleQuickEntry}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handlePrint={handlePrint}
          />
          
          {/* Billing Form */}
          <BillingForm 
            open={billingOpen}
            onClose={() => setBillingOpen(false)}
            patientData={selectedAppointment ? {
              patientId: selectedAppointment.patientId,
              patientName: selectedAppointment.patientName,
              age: selectedAppointment.age || 30,
              gender: selectedAppointment.gender || 'Male',
              contactNumber: selectedAppointment.contactNumber || '9876543210'
            } : null}
          />
          
          {/* Appointment Booking Modal */}
          <AppointmentBookingModal
            open={bookingOpen}
            onClose={() => setBookingOpen(false)}
            doctorId={selectedDoctor}
            doctorName={doctorsData?.data?.find(doc => doc.doctorId === parseInt(selectedDoctor))?.doctorName}
            selectedDate={selectedAppointment?.date || selectedDate}
            selectedTime={selectedAppointment?.time}
            onSuccess={() => {
              setBookingOpen(false);
              // Refresh appointments data
              // This will happen automatically if you're using React Query's invalidation
            }}
          />
        </TabPanel>
      </TabPanel>
    </Box>
  );
};

export default BookingPage;