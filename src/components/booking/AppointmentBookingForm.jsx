import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  Button, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Checkbox, 
  Snackbar, 
  Alert, 
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useBookAppointment } from '../../hooks/useAppointmentQueries';

const AppointmentBookingForm = ({ 
  doctorId, 
  doctorName, 
  selectedDate, 
  selectedTime, 
  onSuccess, 
  onCancel 
}) => {
  // Form state
  const [formData, setFormData] = useState({
    // Appointment details
    APP_doctor_id: doctorId || 1,
    APP_branch_id: 1,
    APP_date: selectedDate ? dayjs(selectedDate) : dayjs(),
    APP_start_time: selectedTime ? dayjs(selectedTime, 'HH:mm') : dayjs(),
    APP_end_time: selectedTime ? dayjs(selectedTime, 'HH:mm').add(30, 'minute') : dayjs().add(30, 'minute'),
    APP_status: 'Booked',
    APP_notes: '',
    APP_created_at: dayjs(),
    
    // Patient details
    PAT_title: 'Mr.',
    PAT_firstname: '',
    PAT_lastname: '',
    PAT_email: '',
    PAT_gender: 'Male',
    PAT_dob: dayjs().subtract(30, 'year'),
    PAT_age: 30,
    PAT_mobile_number: '',
    PAT_address: '',
    PAT_current_address: '',
    PAT_permanent_address: '',
    PAT_blood_group: '',
    PAT_marital_status: 'Single',
    PAT_fh_name: '',
    PAT_fh_type: 'Father',
    PAT_area: '',
    PAT_ref_by: '',
    PAT_ref_to: '',
    PAT_uhid: '',
    PAT_is_first_visit: true,
    
    // Visit details
    visit_purpose: 'Consultation'
  });

  // Validation state
  const [errors, setErrors] = useState({});
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle date changes
  const handleDateChange = (name, date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
    
    // If changing DOB, calculate age
    if (name === 'PAT_dob') {
      const age = dayjs().diff(date, 'year');
      setFormData(prev => ({ ...prev, PAT_age: age }));
    }
  };

  // Handle age change to update DOB
  const handleAgeChange = (e) => {
    const age = parseInt(e.target.value) || 0;
    setFormData(prev => ({ 
      ...prev, 
      PAT_age: age,
      PAT_dob: dayjs().subtract(age, 'year')
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.PAT_firstname) newErrors.PAT_firstname = 'First name is required';
    if (!formData.PAT_lastname) newErrors.PAT_lastname = 'Last name is required';
    if (!formData.PAT_mobile_number) newErrors.PAT_mobile_number = 'Mobile number is required';
    if (!formData.PAT_area) newErrors.PAT_area = 'Area is required';
    
    // Email validation
    if (formData.PAT_email && !/\S+@\S+\.\S+/.test(formData.PAT_email)) {
      newErrors.PAT_email = 'Email is invalid';
    }
    
    // Mobile validation
    if (formData.PAT_mobile_number && !/^\d{10}$/.test(formData.PAT_mobile_number)) {
      newErrors.PAT_mobile_number = 'Mobile number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Use the booking mutation
  const { mutate: bookAppointment, isPending } = useBookAppointment({
    onSuccess: (data) => {
      setSnackbar({
        open: true,
        message: 'Appointment booked successfully!',
        severity: 'success'
      });
      
      // Call success callback with response data
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      console.error('Error booking appointment:', error);
      
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error booking appointment',
        severity: 'error'
      });
    }
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form',
        severity: 'error'
      });
      return;
    }
    
    // Prepare payload for API
    const payload = {
      APP_doctor_id: formData.APP_doctor_id,
      APP_branch_id: formData.APP_branch_id,
      APP_date: formData.APP_date.format('YYYY-MM-DD'),
      APP_start_time: formData.APP_start_time.format('HH:mm:ss'),
      APP_end_time: formData.APP_end_time.format('HH:mm:ss'),
      APP_status: formData.APP_status,
      APP_notes: formData.APP_notes || `${formData.visit_purpose} appointment`,
      APP_created_at: formData.APP_created_at.format('YYYY-MM-DDTHH:mm:ssZ'),
      PAT_firstname: formData.PAT_firstname,
      PAT_lastname: formData.PAT_lastname,
      PAT_email: formData.PAT_email,
      PAT_gender: formData.PAT_gender,
      PAT_address: formData.PAT_address || formData.PAT_current_address,
      PAT_blood_group: formData.PAT_blood_group,
      PAT_mobile_number: formData.PAT_mobile_number
    };
    
    // Call the mutation
    bookAppointment(payload);
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: '100%', mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography variant="h5" gutterBottom>
          Book Appointment
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        {/* Appointment Details Section */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Appointment Details
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              disabled
              label="Doctor Name"
              value={doctorName || `Doctor ID: ${formData.APP_doctor_id}`}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="visit-purpose-label">Visit Purpose</InputLabel>
              <Select
                labelId="visit-purpose-label"
                name="visit_purpose"
                value={formData.visit_purpose}
                onChange={handleChange}
                label="Visit Purpose"
              >
                <MenuItem value="Consultation">Consultation</MenuItem>
                <MenuItem value="Review">Review</MenuItem>
                <MenuItem value="Checkup">Checkup</MenuItem>
                <MenuItem value="Follow-up">Follow-up</MenuItem>
                <MenuItem value="Emergency">Emergency</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Appointment Date"
                value={formData.APP_date}
                onChange={(date) => handleDateChange('APP_date', date)}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Appointment Time"
                value={formData.APP_start_time}
                onChange={(time) => {
                  handleDateChange('APP_start_time', time);
                  handleDateChange('APP_end_time', dayjs(time).add(30, 'minute'));
                }}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              name="APP_notes"
              label="Notes"
              value={formData.APP_notes}
              onChange={handleChange}
              placeholder="Any additional notes about the appointment"
            />
          </Grid>
        </Grid>
        
        {/* Patient Details Section */}
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Patient Details
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id="title-label">Title</InputLabel>
              <Select
                labelId="title-label"
                name="PAT_title"
                value={formData.PAT_title}
                onChange={handleChange}
                label="Title"
              >
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
                <MenuItem value="Dr.">Dr.</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <TextField
              required
              fullWidth
              name="PAT_firstname"
              label="First Name"
              value={formData.PAT_firstname}
              onChange={handleChange}
              error={!!errors.PAT_firstname}
              helperText={errors.PAT_firstname}
            />
          </Grid>
          
          <Grid item xs={12} md={5}>
            <TextField
              required
              fullWidth
              name="PAT_lastname"
              label="Last Name"
              value={formData.PAT_lastname}
              onChange={handleChange}
              error={!!errors.PAT_lastname}
              helperText={errors.PAT_lastname}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="PAT_gender"
                value={formData.PAT_gender}
                onChange={handleChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={formData.PAT_dob}
                onChange={(date) => handleDateChange('PAT_dob', date)}
                slotProps={{
                  textField: { fullWidth: true }
                }}
              />
            </LocalizationProvider>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="PAT_age"
              label="Age"
              type="number"
              value={formData.PAT_age}
              onChange={handleAgeChange}
              InputProps={{ inputProps: { min: 0, max: 120 } }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="PAT_mobile_number"
              label="Mobile Number"
              value={formData.PAT_mobile_number}
              onChange={handleChange}
              error={!!errors.PAT_mobile_number}
              helperText={errors.PAT_mobile_number}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="PAT_email"
              label="Email ID"
              type="email"
              value={formData.PAT_email}
              onChange={handleChange}
              error={!!errors.PAT_email}
              helperText={errors.PAT_email}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="PAT_area"
              label="Area"
              value={formData.PAT_area}
              onChange={handleChange}
              error={!!errors.PAT_area}
              helperText={errors.PAT_area}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="blood-group-label">Blood Group</InputLabel>
              <Select
                labelId="blood-group-label"
                name="PAT_blood_group"
                value={formData.PAT_blood_group}
                onChange={handleChange}
                label="Blood Group"
              >
                <MenuItem value="">Not Known</MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="marital-status-label">Marital Status</InputLabel>
              <Select
                labelId="marital-status-label"
                name="PAT_marital_status"
                value={formData.PAT_marital_status}
                onChange={handleChange}
                label="Marital Status"
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="fh-type-label">F/H Type</InputLabel>
              <Select
                labelId="fh-type-label"
                name="PAT_fh_type"
                value={formData.PAT_fh_type}
                onChange={handleChange}
                label="F/H Type"
              >
                <MenuItem value="Father">Father</MenuItem>
                <MenuItem value="Husband">Husband</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="PAT_fh_name"
              label="Father/Husband Name"
              value={formData.PAT_fh_name}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="PAT_ref_by"
              label="Referred By"
              value={formData.PAT_ref_by}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="PAT_ref_to"
              label="Referred To"
              value={formData.PAT_ref_to}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="PAT_uhid"
              label="UHID"
              value={formData.PAT_uhid}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="PAT_is_first_visit"
                  checked={formData.PAT_is_first_visit}
                  onChange={handleChange}
                />
              }
              label="Is First Visit"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="PAT_current_address"
              label="Current Address"
              value={formData.PAT_current_address}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="PAT_permanent_address"
              label="Permanent Address"
              value={formData.PAT_permanent_address}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        
        {/* Form Actions */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant="outlined" 
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AppointmentBookingForm;