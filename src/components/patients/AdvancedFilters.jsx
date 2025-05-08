import React from 'react';
import { Box, Typography, Divider, Grid, TextField, Button } from '@mui/material';

const AdvancedFilters = ({ filters, onFilterChange, onClearFilters }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="subtitle2" color="primary" gutterBottom>
        Advanced Filters
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Gender"
            name="gender"
            value={filters.gender}
            onChange={onFilterChange}
            size="small"
            SelectProps={{
              native: true,
            }}
          >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </TextField>
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <TextField
            fullWidth
            label="Age From"
            name="ageFrom"
            type="number"
            value={filters.ageFrom}
            onChange={onFilterChange}
            size="small"
          />
        </Grid>
        <Grid item xs={6} sm={3} md={2}>
          <TextField
            fullWidth
            label="Age To"
            name="ageTo"
            type="number"
            value={filters.ageTo}
            onChange={onFilterChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Blood Group"
            name="bloodGroup"
            value={filters.bloodGroup}
            onChange={onFilterChange}
            size="small"
            SelectProps={{
              native: true,
            }}
          >
            <option value=""></option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </TextField>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            onClick={onClearFilters}
            sx={{ color: '#4CAF50' }}
          >
            Clear All
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvancedFilters;