import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Stack, 
  TextField, 
  IconButton 
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchFilters = ({ filters, handleFilterChange }) => {
  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, borderLeft: '4px solid #4CAF50' }}>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Search Filters
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            name="patientId"
            label="Patient ID"
            variant="outlined"
            size="small"
            value={filters.patientId}
            onChange={handleFilterChange}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                }
              }
            }}
          />
          <TextField
            name="patientName"
            label="Patient Name"
            variant="outlined"
            size="small"
            value={filters.patientName}
            onChange={handleFilterChange}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                }
              }
            }}
          />
          <TextField
            name="tokenNo"
            label="Token No"
            variant="outlined"
            size="small"
            value={filters.tokenNo}
            onChange={handleFilterChange}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                }
              }
            }}
          />
          <IconButton 
            sx={{ 
              bgcolor: '#4CAF50', 
              color: 'white',
              '&:hover': {
                bgcolor: '#388E3C',
              }
            }}
          >
            <SearchIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default SearchFilters;