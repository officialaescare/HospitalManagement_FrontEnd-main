import React from 'react';
import { 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField 
} from '@mui/material';

const DoctorSelector = ({ 
  selectedDoctor, 
  doctorSpecialization, 
  handleDoctorChange, 
  doctorsData, 
  isLoadingDoctors 
}) => {
  return (
    <Paper sx={{ p: 2, mb: 3, borderTop: '4px solid #4CAF50' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small" sx={{ 
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#4CAF50',
              }
            }
          }}>
            <InputLabel id="doctor-select-label">Select Doctor</InputLabel>
            <Select
              labelId="doctor-select-label"
              id="doctor-select"
              value={selectedDoctor}
              label="Select Doctor"
              onChange={handleDoctorChange}
            >
              <MenuItem value="">
                <em>Select a doctor</em>
              </MenuItem>
              {isLoadingDoctors ? (
                <MenuItem disabled>Loading doctors...</MenuItem>
              ) : (
                doctorsData?.data?.map((doctor) => (
                  <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                    {doctor.doctorName}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Specialization"
            variant="outlined"
            size="small"
            value={doctorSpecialization}
            InputProps={{
              readOnly: true,
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                }
              }
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DoctorSelector;