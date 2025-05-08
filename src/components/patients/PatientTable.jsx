import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Button
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const PatientTable = ({ 
  loading, 
  error, 
  patients, 
  onViewPatient, 
  onEditPatient, 
  onDeletePatient,
  onRetry 
}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress sx={{ color: '#4CAF50' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
        <Button 
          variant="outlined" 
          sx={{ mt: 2, color: '#4CAF50', borderColor: '#4CAF50' }}
          onClick={onRetry}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <TableContainer sx={{ maxHeight: 600 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ 
            '& th': { 
              bgcolor: '#4CAF50', 
              color: 'white',
              fontWeight: 'bold'
            } 
          }}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Blood Group</TableCell>
            <TableCell>Last Visit</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <TableRow 
                key={patient.id}
                sx={{ 
                  bgcolor: index % 2 === 0 ? 'white' : '#F9FFF9',
                  '&:hover': {
                    bgcolor: '#E8F5E9',
                  }
                }}
              >
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.bloodGroup}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell align="center">
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={() => onViewPatient(patient.id)}
                    title="View Details"
                  >
                    <ViewIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={() => onEditPatient(patient.id)}
                    title="Edit Patient"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => onDeletePatient(patient)}
                    title="Delete Patient"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                <Typography variant="body1">
                  No patients found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientTable;