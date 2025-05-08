import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Stack, 
  Button 
} from '@mui/material';
import { 
  DatePicker, 
  LocalizationProvider 
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DateFilter = ({ selectedDate, setSelectedDate }) => {
  return (
    <Grid item xs={12} md={6}>
      <Paper sx={{ p: 2, borderLeft: '4px solid #4CAF50' }}>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Date Selection
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              slotProps={{ 
                textField: { 
                  size: 'small',
                  sx: { 
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#4CAF50',
                      }
                    }
                  }
                } 
              }}
            />
          </LocalizationProvider>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              bgcolor: '#4CAF50',
              '&:hover': {
                bgcolor: '#388E3C',
              }
            }}
          >
            Next 7 Days
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default DateFilter;