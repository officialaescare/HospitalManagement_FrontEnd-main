import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Divider,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Snackbar,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  Save as SaveIcon,
  Clear as ClearIcon,
  Print as PrintIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { differenceInYears, format, parse } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PATIENTS_API } from '../../api/endpoints';

// Form field validation
const validateField = (name, value) => {
  switch (name) {
    case 'firstName':
      return value.trim() ? '' : 'First name is required';
    case 'lastName':
      return value.trim() ? '' : 'Last name is required';
    case 'dateOfBirth':
      return value ? '' : 'Date of birth is required';
    case 'gender':
      return value ? '' : 'Gender is required';
    case 'mobileNumber':
      return /^\d{10}$/.test(value) ? '' : 'Enter a valid 10-digit mobile number';
    case 'email':
      return value ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address') : '';
    case 'address':
      return value.trim() ? '' : 'Address is required';
    case 'bloodGroup':
      return value ? '' : 'Blood group is required';
    case 'maritalStatus':
      return value ? '' : 'Marital status is required';
    default:
      return '';
  }
};

const PatientRegistrationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get patient ID from URL if editing
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    age: '',
    gender: '',
    mobileNumber: '',
    email: '',
    address: '',
    bloodGroup: '',
    fatherHusbandName: '',
    maritalStatus: '',
    uhid: '',
    qualification: '',
    jobDescription: '',
    comments: '',
    isFirstVisit: false,
    deceased: false,
    referredTo: '',
    referredBy: '',
    category: '',
    createdBy: '',
    branchId: '1' // Default branch ID from session
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  
  // Check if we're in edit mode and fetch patient data
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchPatientData(id);
    }
  }, [id]);
  
  // Fetch patient data for editing
  const fetchPatientData = async (patientId) => {
    setLoading(true);
    try {
      const response = await axios.get(PATIENTS_API.GET_BY_ID(patientId));
      
      if (response.data) {
        // Format the data for the form
        const patientData = response.data;
        
        // Convert date string to Date object if needed
        const dateOfBirth = patientData.dateOfBirth ? 
          (typeof patientData.dateOfBirth === 'string' ? 
            parse(patientData.dateOfBirth, 'yyyy-MM-dd', new Date()) : 
            patientData.dateOfBirth) : 
          null;
        
        setFormData({
          ...patientData,
          dateOfBirth
        });
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setSnackbar({
        open: true,
        message: 'Failed to load patient data. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Steps for the stepper
  const steps = ['Personal Information', 'Contact Details', 'Additional Information'];
  
  // Mock data for dropdowns
  const qualifications = [
    'High School', 'Associate Degree', 'Bachelor\'s Degree', 
    'Master\'s Degree', 'Doctorate', 'Other'
  ];
  
  const categories = [
    'General', 'OPD', 'Emergency', 'VIP', 'Staff'
  ];
  
  const users = [
    { id: '1', name: 'Dr. John Smith' },
    { id: '2', name: 'Dr. Sarah Johnson' },
    { id: '3', name: 'Nurse Williams' },
    { id: '4', name: 'Admin User' }
  ];
  
  // Calculate age when date of birth changes
  useEffect(() => {
    if (formData.dateOfBirth) {
      const age = differenceInYears(new Date(), formData.dateOfBirth);
      setFormData(prev => ({ ...prev, age: age.toString() }));
    }
  }, [formData.dateOfBirth]);
  
  // Handle form field changes
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Validate field
    const errorMessage = validateField(name, newValue);
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };
  
  // Handle date change
  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: date
    }));
    
    // Validate field
    const errorMessage = validateField('dateOfBirth', date);
    setErrors(prev => ({
      ...prev,
      dateOfBirth: errorMessage
    }));
  };
  
  // Validate step before proceeding
  const validateStep = (step) => {
    let newErrors = {};
    let isValid = true;
    
    if (step === 0) {
      // Validate personal information
      const fieldsToValidate = ['firstName', 'lastName', 'dateOfBirth', 'gender', 'bloodGroup', 'maritalStatus'];
      
      fieldsToValidate.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });
    } else if (step === 1) {
      // Validate contact details
      const fieldsToValidate = ['mobileNumber', 'address'];
      
      fieldsToValidate.forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });
      
      // Validate email only if provided
      if (formData.email) {
        const emailError = validateField('email', formData.email);
        if (emailError) {
          newErrors.email = emailError;
          isValid = false;
        }
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  // Handle form reset
  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      age: '',
      gender: '',
      mobileNumber: '',
      email: '',
      address: '',
      bloodGroup: '',
      fatherHusbandName: '',
      maritalStatus: '',
      uhid: '',
      qualification: '',
      jobDescription: '',
      comments: '',
      isFirstVisit: false,
      deceased: false,
      referredTo: '',
      referredBy: '',
      category: '',
      createdBy: '',
      branchId: '1'
    });
    setErrors({});
    setActiveStep(0);
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    // Validate all fields
    let allErrors = {};
    const requiredFields = [
      'firstName', 'lastName', 'dateOfBirth', 'gender', 
      'mobileNumber', 'address', 'bloodGroup', 'maritalStatus'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        allErrors[field] = error;
        isValid = false;
      }
    });
    
    // Validate email only if provided
    if (formData.email) {
      const emailError = validateField('email', formData.email);
      if (emailError) {
        allErrors.email = emailError;
        isValid = false;
      }
    }
    
    setErrors(allErrors);
    
    if (!isValid) {
      setSnackbar({
        open: true,
        message: 'Please fix the errors before submitting',
        severity: 'error'
      });
      return;
    }
    
    // Prepare data for submission
    const patientData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : null
    };
    
    setLoading(true);
    
    try {
      let response;
      
      if (isEditMode) {
        // Update existing patient
        response = await axios.put(PATIENTS_API.UPDATE(id), patientData);
        
        setSnackbar({
          open: true,
          message: 'Patient updated successfully!',
          severity: 'success'
        });
      } else {
        // Create new patient
        response = await axios.post(PATIENTS_API.CREATE, patientData);
        
        setSnackbar({
          open: true,
          message: 'Patient registered successfully!',
          severity: 'success'
        });
      }
      
      // Redirect to patient list after successful operation
      setTimeout(() => {
        navigate('/patients');
      }, 2000);
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'registering'} patient:`, error);
      
      setSnackbar({
        open: true,
        message: error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'register'} patient. Please try again.`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };
  
  // Common text field styling
  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#4CAF50',
      }
    }
  };
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? 'Edit Patient' : 'Patient Registration'}
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3, borderTop: '4px solid #4CAF50' }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {/* Step 1: Personal Information */}
        {activeStep === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Father/Husband Name"
                name="fatherHusbandName"
                value={formData.fatherHusbandName}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  slotProps={{ 
                    textField: { 
                      fullWidth: true,
                      required: true,
                      error: !!errors.dateOfBirth,
                      helperText: errors.dateOfBirth,
                      sx: textFieldSx
                    } 
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={formData.age}
                InputProps={{ readOnly: true }}
                variant="outlined"
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl 
                fullWidth 
                required 
                error={!!errors.gender}
              >
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                  sx={{ 
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4CAF50',
                    }
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl 
                fullWidth 
                required
                error={!!errors.maritalStatus}
              >
                <InputLabel id="marital-status-label">Marital Status</InputLabel>
                <Select
                  labelId="marital-status-label"
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  label="Marital Status"
                  sx={{ 
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4CAF50',
                    }
                  }}
                >
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </Select>
                {errors.maritalStatus && <FormHelperText>{errors.maritalStatus}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl 
                fullWidth 
                required
                error={!!errors.bloodGroup}
              >
                <InputLabel id="blood-group-label">Blood Group</InputLabel>
                <Select
                  labelId="blood-group-label"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  label="Blood Group"
                  sx={{ 
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4CAF50',
                    }
                  }}
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </Select>
                {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="UHID"
                name="uhid"
                value={formData.uhid}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />
            </Grid>
          </Grid>
        )}
        
        {/* Step 2: Contact Details */}
        {activeStep === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom>
                Contact Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                variant="outlined"
                required
                error={!!errors.mobileNumber}
                helperText={errors.mobileNumber}
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                type="email"
                error={!!errors.email}
                helperText={errors.email}
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
                required
                error={!!errors.address}
                helperText={errors.address}
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Referred By"
                name="referredBy"
                value={formData.referredBy}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Referred To"
                name="referredTo"
                value={formData.referredTo}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />
            </Grid>
          </Grid>
        )}
        
        {/* Step 3: Additional Information */}
        {activeStep === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom>
                Additional Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="qualification-label">Qualification</InputLabel>
                <Select
                  labelId="qualification-label"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  label="Qualification"
                  sx={{ 
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4CAF50',
                    }
                  }}
                >
                  {qualifications.map((qual) => (
                    <MenuItem key={qual} value={qual}>{qual}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                  sx={{ 
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4CAF50',
                    }
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="created-by-label">Created By</InputLabel>
                <Select
                  labelId="created-by-label"
                  name="createdBy"
                  value={formData.createdBy}
                  onChange={handleChange}
                  label="Created By"
                  sx={{ 
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4CAF50',
                    }
                  }}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                variant="outlined"
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
                sx={textFieldSx}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.isFirstVisit}
                    onChange={handleChange}
                    name="isFirstVisit"
                  />
                }
                label="Is First Visit"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.deceased}
                    onChange={handleChange}
                    name="deceased"
                  />
                }
                label="Deceased"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Branch ID"
                name="branchId"
                value={formData.branchId}
                variant="outlined"
                InputProps={{ readOnly: true }}
                sx={textFieldSx}
              />
            </Grid>
          </Grid>
        )}
        
        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={handleReset}
            startIcon={<ClearIcon />}
            sx={{ 
              borderColor: '#F44336',
              color: '#F44336',
              '&:hover': {
                borderColor: '#D32F2F',
                bgcolor: 'rgba(244, 67, 54, 0.04)',
              }
            }}
          >
            Reset
          </Button>
          
          <Box>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  disabled={loading}
                  sx={{ 
                    bgcolor: '#4CAF50',
                    '&:hover': {
                      bgcolor: '#388E3C',
                    },
                    mr: 1
                  }}
                >
                  {loading ? 'Saving...' : 'Register Patient'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  sx={{ 
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                    '&:hover': {
                      borderColor: '#388E3C',
                      bgcolor: 'rgba(76, 175, 80, 0.04)',
                    }
                  }}
                >
                  Print
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  bgcolor: '#4CAF50',
                  '&:hover': {
                    bgcolor: '#388E3C',
                  }
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PatientRegistrationPage;
