import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Search as SearchIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  MedicalServices as MedicalIcon,
  Medication as MedicationIcon,
  Science as LabIcon,
  Assignment as NotesIcon,
  AttachFile as FileIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PATIENTS_API } from '../../api/endpoints';

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const PatientRecordsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(id || null);
  
  // Mock data for patients
  const [patients, setPatients] = useState([
    { id: 'PT001', name: 'John Smith', age: 45, gender: 'Male', phone: '555-123-4567', lastVisit: '2023-04-10' },
    { id: 'PT002', name: 'Sarah Johnson', age: 32, gender: 'Female', phone: '555-234-5678', lastVisit: '2023-04-12' },
    { id: 'PT003', name: 'Michael Brown', age: 58, gender: 'Male', phone: '555-345-6789', lastVisit: '2023-04-05' },
    { id: 'PT004', name: 'Emily Davis', age: 27, gender: 'Female', phone: '555-456-7890', lastVisit: '2023-04-15' },
    { id: 'PT005', name: 'Robert Wilson', age: 63, gender: 'Male', phone: '555-567-8901', lastVisit: '2023-04-08' },
    { id: 'PT006', name: 'Jennifer Lee', age: 41, gender: 'Female', phone: '555-678-9012', lastVisit: '2023-04-11' },
    { id: 'PT007', name: 'David Miller', age: 52, gender: 'Male', phone: '555-789-0123', lastVisit: '2023-04-09' },
  ]);
  
  // State for patient details
  const [patientDetails, setPatientDetails] = useState({
    id: 'PT001',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    dob: '1978-06-15',
    phone: '555-123-4567',
    email: 'john.smith@example.com',
    address: '123 Main St, Anytown, USA',
    bloodGroup: 'O+',
    allergies: 'Penicillin',
    chronicConditions: 'Hypertension, Diabetes Type 2',
    emergencyContact: 'Mary Smith (Wife) - 555-987-6543',
    insurance: 'BlueCross BlueShield - Policy #12345678',
    registrationDate: '2020-03-10'
  });
  
  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, []);
  
  // Fetch specific patient if ID is provided
  useEffect(() => {
    if (id) {
      setSelectedPatientId(id);
      fetchPatientDetails(id);
    }
  }, [id]);
  
  // Fetch all patients
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await axios.get(PATIENTS_API.GET_ALL);
      if (response.data) {
        setPatients(response.data);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching patients:', err);
      // Keep using mock data if API fails
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch patient details
  const fetchPatientDetails = async (patientId) => {
    setLoading(true);
    try {
      const response = await axios.get(PATIENTS_API.GET_BY_ID(patientId));
      if (response.data) {
        setPatientDetails(response.data);
      } else {
        // If API returns no data, find patient in our mock data
        const patient = patients.find(p => p.id === patientId);
        if (patient) {
          setPatientDetails({
            ...patient,
            dob: '1978-06-15', // Default values for mock data
            email: patient.email || `${patient.name.toLowerCase().replace(' ', '.')}@example.com`,
            address: '123 Main St, Anytown, USA',
            bloodGroup: patient.bloodGroup || 'O+',
            allergies: 'None',
            chronicConditions: 'None',
            emergencyContact: 'Family Member - 555-987-6543',
            insurance: 'Insurance Provider - Policy #12345678',
            registrationDate: '2020-03-10'
          });
        }
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching patient details:', err);
      setError('Failed to load patient details. Please try again.');
      
      // If API fails, try to use mock data
      const patient = patients.find(p => p.id === patientId);
      if (patient) {
        setPatientDetails({
          ...patient,
          dob: '1978-06-15',
          email: patient.email || `${patient.name.toLowerCase().replace(' ', '.')}@example.com`,
          address: '123 Main St, Anytown, USA',
          bloodGroup: patient.bloodGroup || 'O+',
          allergies: 'None',
          chronicConditions: 'None',
          emergencyContact: 'Family Member - 555-987-6543',
          insurance: 'Insurance Provider - Policy #12345678',
          registrationDate: '2020-03-10'
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Mock data for visits
  const visits = [
    { date: '2023-04-10', doctor: 'Dr. Johnson', diagnosis: 'Hypertension follow-up', notes: 'Blood pressure stable. Continue medication.' },
    { date: '2023-03-15', doctor: 'Dr. Williams', diagnosis: 'Diabetes check', notes: 'HbA1c improved. Diet and exercise maintained.' },
    { date: '2023-02-20', doctor: 'Dr. Johnson', diagnosis: 'Annual physical', notes: 'Overall health good. Recommended routine tests.' },
    { date: '2023-01-05', doctor: 'Dr. Davis', diagnosis: 'Flu symptoms', notes: 'Prescribed antivirals and rest. Follow up in 1 week.' },
  ];
  
  // Mock data for medications
  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2021-05-10', endDate: 'Ongoing', prescribedBy: 'Dr. Johnson' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2021-05-10', endDate: 'Ongoing', prescribedBy: 'Dr. Williams' },
    { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', startDate: '2021-05-10', endDate: 'Ongoing', prescribedBy: 'Dr. Johnson' },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', startDate: '2022-01-15', endDate: 'Ongoing', prescribedBy: 'Dr. Johnson' },
  ];
  
  // Mock data for lab results
  const labResults = [
    { date: '2023-04-05', test: 'Complete Blood Count', result: 'Normal', orderedBy: 'Dr. Johnson' },
    { date: '2023-04-05', test: 'Lipid Panel', result: 'Cholesterol: 195 mg/dL (Borderline)', orderedBy: 'Dr. Johnson' },
    { date: '2023-04-05', test: 'HbA1c', result: '6.8% (Controlled)', orderedBy: 'Dr. Johnson' },
    { date: '2023-01-20', test: 'Urinalysis', result: 'Normal', orderedBy: 'Dr. Davis' },
  ];
  
  // Mock data for documents
  const documents = [
    { date: '2023-04-10', name: 'Prescription - Lisinopril', type: 'Prescription', uploadedBy: 'Dr. Johnson' },
    { date: '2023-03-15', name: 'Lab Results - Diabetes Check', type: 'Lab Report', uploadedBy: 'Lab Technician' },
    { date: '2023-02-20', name: 'Annual Physical Report', type: 'Medical Report', uploadedBy: 'Dr. Johnson' },
    { date: '2022-11-10', name: 'Chest X-Ray', type: 'Radiology', uploadedBy: 'Radiology Dept.' },
  ];
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle patient selection from the list
  const handlePatientSelect = (patientId) => {
    setSelectedPatientId(patientId);
    fetchPatientDetails(patientId);
    
    // Update URL without reloading the page
    navigate(`/emr/patient-records/${patientId}`, { replace: true });
  };
  
  // Handle edit patient button click
  const handleEditPatient = () => {
    navigate(`/appointment/patient-registration/${selectedPatientId}`);
  };
  
  // Handle back button click to return to patients list
  const handleBackToList = () => {
    navigate('/patients');
  };
  
  return (
    <Box>
      {/* Header with back button if viewing a specific patient from patients page */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {id && (
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackToList}
            sx={{ mr: 2 }}
          >
            Back to Patients
          </Button>
        )}
        <Typography variant="h4">
          Patient Records
        </Typography>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
          <CircularProgress sx={{ color: '#4CAF50' }} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : 
     (
    
        <Grid container spacing={3}>
          {/* Search Section - Only show if not viewing a specific patient */}
          {!id && (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, borderLeft: '4px solid #4CAF50' }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  Search Patient
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Search by ID, Name, or Phone"
                      variant="outlined"
                      size="small"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                      variant="contained"
                      startIcon={<SearchIcon />}
                      sx={{ 
                        bgcolor: '#4CAF50',
                        '&:hover': {
                          bgcolor: '#388E3C',
                        }
                      }}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
          
          {/* Patient List - Only show if not viewing a specific patient */}
          {!id && (
            <Grid item xs={12} md={4}>
              <Paper sx={{ height: '100%', borderLeft: '4px solid #4CAF50' }}>
                <TableContainer sx={{ maxHeight: 600 }}>
                  <Table stickyHeader size="small">
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
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patients
                        .filter(patient => 
                          patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.name.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((patient, index) => (
                        <TableRow 
                          key={patient.id}
                          sx={{ 
                            cursor: 'pointer',
                            bgcolor: patient.id === selectedPatientId ? '#E8F5E9' : 
                              (index % 2 === 0 ? 'white' : '#F9FFF9'),
                            '&:hover': {
                              bgcolor: '#E8F5E9',
                            }
                          }}
                          onClick={() => handlePatientSelect(patient.id)}
                        >
                          <TableCell>{patient.id}</TableCell>
                          <TableCell>{patient.name}</TableCell>
                          <TableCell>{patient.age}</TableCell>
                          <TableCell>
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePatientSelect(patient.id);
                              }}
                            >
                              <ViewIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          )}
          
          {/* Patient Details */}
          <Grid item xs={12} md={id ? 12 : 8}>
            <Paper sx={{ p: 2, borderLeft: '4px solid #4CAF50' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="primary">
                  Patient Details: {patientDetails.name} ({patientDetails.id})
                </Typography>
                <Box>
                  <IconButton 
                    color="primary" 
                    size="small" 
                    sx={{ mr: 1 }}
                    onClick={handleEditPatient}
                    title="Edit Patient"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="primary" 
                    size="small"
                    title="Print Patient Record"
                  >
                    <PrintIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Age / Gender
                  </Typography>
                  <Typography variant="body1">
                    {patientDetails.age} / {patientDetails.gender}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date of Birth
                  </Typography>
                  <Typography variant="body1">
                    {patientDetails.dob}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Blood Group
                  </Typography>
                  <Typography variant="body1">
                    {patientDetails.bloodGroup}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">
                    {patientDetails.phone}
                  </Typography>
                </Grid>
            </Grid>
              
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': { 
                    minWidth: 'auto',
                    '&.Mui-selected': {
                      color: '#4CAF50',
                    }
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#4CAF50',
                  }
                }}
                >
                  <Tab label="Visits" icon={<MedicalIcon />} iconPosition="start" />
                  <Tab label="Medications" icon={<MedicationIcon />} iconPosition="start" />
                  <Tab label="Lab Results" icon={<LabIcon />} iconPosition="start" />
                  <Tab label="Documents" icon={<FileIcon />} iconPosition="start" />
                </Tabs>
                
                <TabPanel value={tabValue} index={0}>
                  <List>
                {visits.map((visit, index) => (
                  <React.Fragment key={index}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{ 
                        py: 1.5,
                        bgcolor: index % 2 === 0 ? 'white' : '#F9FFF9',
                        '&:hover': { bgcolor: '#E8F5E9' }
                      }}
                    >
                      <ListItemIcon>
                        <MedicalIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">{visit.date}</Typography>
                            <Typography variant="body2">{visit.doctor}</Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" component="span" color="text.primary">
                              {visit.diagnosis}
                            </Typography>
                            <Typography variant="body2" component="div" color="text.secondary" sx={{ mt: 1 }}>
                              {visit.notes}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < visits.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
                  </List>
                </TabPanel>
                
                <TabPanel value={tabValue} index={1}>
                  <TableContainer>
                    <Table size="small">
                  <TableHead>
                    <TableRow sx={{ 
                      '& th': { 
                        bgcolor: '#E8F5E9', 
                        color: '#388E3C',
                        fontWeight: 'bold'
                      } 
                    }}>
                      <TableCell>Medication</TableCell>
                      <TableCell>Dosage</TableCell>
                      <TableCell>Frequency</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Prescribed By</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medications.map((medication, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          bgcolor: index % 2 === 0 ? 'white' : '#F9FFF9',
                        }}
                      >
                        <TableCell>{medication.name}</TableCell>
                        <TableCell>{medication.dosage}</TableCell>
                        <TableCell>{medication.frequency}</TableCell>
                        <TableCell>{medication.startDate}</TableCell>
                        <TableCell>{medication.endDate}</TableCell>
                        <TableCell>{medication.prescribedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ 
                      '& th': { 
                        bgcolor: '#E8F5E9', 
                        color: '#388E3C',
                        fontWeight: 'bold'
                      } 
                    }}>
                      <TableCell>Date</TableCell>
                      <TableCell>Test</TableCell>
                      <TableCell>Result</TableCell>
                      <TableCell>Ordered By</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {labResults.map((lab, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          bgcolor: index % 2 === 0 ? 'white' : '#F9FFF9',
                        }}
                      >
                        <TableCell>{lab.date}</TableCell>
                        <TableCell>{lab.test}</TableCell>
                        <TableCell>{lab.result}</TableCell>
                        <TableCell>{lab.orderedBy}</TableCell>
                        <TableCell>
                          <IconButton size="small" color="primary">
                            <ViewIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="primary">
                            <PrintIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            
            <TabPanel value={tabValue} index={3}>
              <List>
                {documents.map((doc, index) => (
                  <React.Fragment key={index}>
                    <ListItem 
                      alignItems="flex-start"
                      sx={{ 
                        py: 1.5,
                        bgcolor: index % 2 === 0 ? 'white' : '#F9FFF9',
                        '&:hover': { bgcolor: '#E8F5E9' }
                      }}
                    >
                      <ListItemIcon>
                        <FileIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">{doc.name}</Typography>
                            <Chip 
                              label={doc.type} 
                              size="small" 
                              sx={{ 
                                bgcolor: '#E8F5E9',
                                color: '#388E3C',
                              }} 
                            />
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" component="span" color="text.secondary">
                              Date: {doc.date}
                            </Typography>
                            <Typography variant="body2" component="span" color="text.secondary" sx={{ ml: 2 }}>
                              Uploaded by: {doc.uploadedBy}
                            </Typography>
                          </>
                        }
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small" color="primary">
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="primary">
                          <PrintIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </ListItem>
                    {index < documents.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>)
}
    </Box>
  
  );
}
  
  

export default PatientRecordsPage;