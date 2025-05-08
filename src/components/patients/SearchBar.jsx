import React from 'react';
import { Grid, TextField, Button, InputAdornment } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon, Clear as ClearIcon } from '@mui/icons-material';

const SearchBar = ({ searchTerm, onSearchChange, showFilters, onToggleFilters }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          label="Search Patients"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
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
      <Grid item>
        <Button
          variant="outlined"
          startIcon={showFilters ? <ClearIcon /> : <FilterIcon />}
          onClick={onToggleFilters}
          sx={{ 
            borderColor: '#4CAF50',
            color: '#4CAF50',
            '&:hover': {
              borderColor: '#388E3C',
              bgcolor: 'rgba(76, 175, 80, 0.04)',
            }
          }}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;