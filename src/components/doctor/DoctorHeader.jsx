import React from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';

const DoctorHeader = ({ title, selectedDoctor, doctors, isLoading, onChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4">{title}</Typography>
      
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel id="doctor-select-label">Doctor Name</InputLabel>
        <Select
          labelId="doctor-select-label"
          id="doctor-select"
          value={selectedDoctor}
          label="Doctor Name"
          onChange={onChange}
          disabled={isLoading}
        >
          {isLoading ? (
            <MenuItem disabled>Loading doctors...</MenuItem>
          ) : (
            doctors.map((doctor) => (
              <MenuItem key={doctor.doctorId} value={doctor.doctorId}>
                {doctor.doctorName} - {doctor.specialization}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DoctorHeader;