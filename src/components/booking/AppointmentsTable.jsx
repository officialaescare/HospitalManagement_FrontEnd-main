import React from 'react';
import { 
  Paper, 
  TableContainer, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  Typography, 
  Box, 
  IconButton, 
  Button, 
  Chip 
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Print as PrintIcon,
  Add as AddIcon,
  Videocam as VideocamIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import StatusChip from './StatusChip';
import BillingChip from './BillingChip';

const AppointmentsTable = ({ 
  appointmentsData, 
  isLoading, 
  handleRowClick, 
  handleQuickEntry, 
  handleEdit, 
  handleDelete, 
  handlePrint 
}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="appointments table">
          <TableHead>
            <TableRow sx={{ 
              '& th': { 
                bgcolor: '#4CAF50', 
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 16px', // Increase padding for better spacing
                whiteSpace: 'nowrap' // Prevent text wrapping
              } 
            }}>
              <TableCell>T.No</TableCell>
              <TableCell>Consultation</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>In Time</TableCell>
              <TableCell>Out Time</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Visit Purpose</TableCell>
              <TableCell>App.Status</TableCell>
              <TableCell>Billing</TableCell>
              <TableCell>Next Visit</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={12} align="center">Loading appointments...</TableCell>
              </TableRow>
            ) : !appointmentsData?.appointments || appointmentsData.appointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No appointment slots found for the selected criteria. Please select a doctor and date to view available slots.
                </TableCell>
              </TableRow>
            ) : (
              appointmentsData.appointments.map((appointment, index) => (
                <TableRow
                  key={appointment.id}
                  hover
                  onClick={() => handleRowClick(appointment)}
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: appointment.isEmpty ? '#FAFAFA' : (index % 2 === 0 ? 'white' : '#F9FFF9'), // Alternating row colors
                    '&:hover': {
                      bgcolor: '#E8F5E9',
                    },
                    '& td': {
                      padding: '10px 16px', // Increase padding for better spacing
                      fontSize: '0.9rem', // Slightly smaller font for better readability
                      color: appointment.isEmpty ? '#757575' : 'inherit' // Lighter text for empty slots
                    }
                  }}
                >
                  <TableCell>{appointment.tokenNo}</TableCell>
                  <TableCell>
                    {appointment.isTeleconsultant ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VideocamIcon sx={{ color: '#0288D1', mr: 1, fontSize: '1.2rem' }} />                        
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ color: '#558B2F', mr: 1, fontSize: '1.2rem' }} />                       
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {appointment.time}
                    </Typography>
                  </TableCell>
                  <TableCell>{appointment.inTime}</TableCell>
                  <TableCell>{appointment.outTime}</TableCell>
                  <TableCell sx={{ color: appointment.patientId ? '#4CAF50' : 'inherit', fontWeight: appointment.patientId ? 'medium' : 'normal' }}>
                    {appointment.patientId}
                  </TableCell>
                  <TableCell>{appointment.patientName}</TableCell>
                  <TableCell>{appointment.visitPurpose}</TableCell>
                  <TableCell>
                    {appointment.isEmpty ? (
                      <Chip 
                        label="Available" 
                        size="small" 
                        sx={{ 
                          bgcolor: '#E8F5E9',
                          color: '#4CAF50',
                          fontWeight: 'medium',
                          '& .MuiChip-label': { px: 1 }
                        }} 
                      />
                    ) : (
                      <StatusChip status={appointment.status} />
                    )}
                  </TableCell>
                  <TableCell>
                    {!appointment.isEmpty && (
                      <BillingChip 
                        status={appointment.billing} 
                        onClick={() => handleRowClick(appointment)}
                      />
                    )}
                  </TableCell>
                  <TableCell>{appointment.nextVisit}</TableCell>
                  <TableCell>
                    {appointment.isEmpty ? (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        sx={{
                          bgcolor: '#4CAF50',
                          '&:hover': { bgcolor: '#388E3C' },
                          fontSize: '0.75rem',
                          py: 0.5
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickEntry(appointment.id, e);
                        }}
                      >
                        Book
                      </Button>
                    ) : (
                      <>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: '#4CAF50',
                            '&:hover': { bgcolor: '#E8F5E9' }
                          }}
                          onClick={(e) => handleQuickEntry(appointment.id, e)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: '#2196F3',
                            '&:hover': { bgcolor: '#E3F2FD' }
                          }}
                          onClick={(e) => handleEdit(appointment.id, e)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: '#F44336',
                            '&:hover': { bgcolor: '#FFEBEE' }
                          }}
                          onClick={(e) => handleDelete(appointment.id, e)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          sx={{ 
                            color: '#757575',
                            '&:hover': { bgcolor: '#F5F5F5' }
                          }}
                          onClick={(e) => handlePrint(appointment.id, e)}
                        >
                          <PrintIcon fontSize="small" />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AppointmentsTable;