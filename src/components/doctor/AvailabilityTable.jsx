import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Checkbox,
  TextField,
  CircularProgress,
  Paper
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Delete as DeleteIcon, Videocam as VideocamIcon, Add as AddIcon } from '@mui/icons-material';

// Days of the week for the table
const daysOfWeek = [
  { key: 'sunday', label: 'Sun' },
  { key: 'monday', label: 'Mon' },
  { key: 'tuesday', label: 'Tue' },
  { key: 'wednesday', label: 'Wed' },
  { key: 'thursday', label: 'Thu' },
  { key: 'friday', label: 'Fri' },
  { key: 'saturday', label: 'Sat' }
];

const AvailabilityTable = ({
  availabilityData,
  isLoading,
  isError,
  selectedDoctor,
  onFieldChange,
  onDeleteRow,
  onAddRow,
  isDeleting
}) => {
  if (isLoading && selectedDoctor) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!selectedDoctor) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', mb: 3 }}>
        <Typography variant="h6" color="text.secondary">
          Please select a doctor to manage their availability
        </Typography>
      </Paper>
    );
  }

  if (isError && selectedDoctor) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', mb: 3, bgcolor: '#FFF4F4' }}>
        <Typography variant="h6" color="error">
          Error loading doctor's availability
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={onAddRow}
        >
          Add New Schedule
        </Button>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="doctor availability table">
          <TableHead>
            <TableRow>
              <TableCell>Teleconsult</TableCell>
              <TableCell>From (hrs)</TableCell>
              <TableCell>To (hrs)</TableCell>
              <TableCell>No. of Patients</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell key={day.key} align="center">{day.label}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availabilityData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No availability schedules found
                  </Typography>
                  <Button 
                    variant="text" 
                    color="primary" 
                    onClick={onAddRow}
                    sx={{ mt: 1 }}
                  >
                    Add New Schedule
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              availabilityData.map((row) => (
                <TableRow 
                  key={row.id}
                  sx={{ 
                    bgcolor: row.isNew ? '#F9FFF9' : 'inherit',
                    '&:hover': { bgcolor: '#F5F5F5' }
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        checked={row.isTeleconsult}
                        onChange={(e) => onFieldChange(row.id, 'isTeleconsult', e.target.checked)}
                      />
                      {row.isTeleconsult && <VideocamIcon color="primary" sx={{ ml: 1 }} />}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <TimePicker
                      value={row.fromTime}
                      onChange={(newValue) => onFieldChange(row.id, 'fromTime', newValue)}
                      slotProps={{ textField: { size: 'small' } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TimePicker
                      value={row.toTime}
                      onChange={(newValue) => onFieldChange(row.id, 'toTime', newValue)}
                      slotProps={{ textField: { size: 'small' } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={row.maxPatients}
                      onChange={(e) => onFieldChange(row.id, 'maxPatients', parseInt(e.target.value, 10))}
                      InputProps={{ inputProps: { min: 1 } }}
                      size="small"
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  {daysOfWeek.map((day) => (
                    <TableCell key={`${row.id}-${day.key}`} align="center">
                      <Checkbox
                        checked={row.days[day.key]}
                        onChange={(e) => onFieldChange(row.id, `days.${day.key}`, e.target.checked)}
                        color="primary"
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton 
                        color="error" 
                        onClick={() => onDeleteRow(row.id)}
                        size="small"
                        disabled={isDeleting}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="outlined" 
          startIcon={<AddIcon />}
          onClick={onAddRow}
          color="primary"
        >
          Add Row
        </Button>
      </Box>
    </Paper>
  );
};

export default AvailabilityTable;