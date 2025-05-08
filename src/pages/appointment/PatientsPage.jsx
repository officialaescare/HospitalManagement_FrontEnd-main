import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import custom components
import PageHeader from '../../components/patients/PageHeader';
import SearchBar from '../../components/patients/SearchBar';
import AdvancedFilters from '../../components/patients/AdvancedFilters';
import PatientTable from '../../components/patients/PatientTable';
import DeleteConfirmationDialog from '../../components/patients/DeleteConfirmationDialog';
import NotificationSnackbar from '../../components/common/NotificationSnackbar';

// Import custom hooks
import { usePatients } from '../../hooks/usePatients';

const PatientsPage = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Use the custom hook for patient data and operations
  const {
    filteredPatients,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    handleFilterChange,
    clearFilters,
    fetchPatients,
    deletePatient
  } = usePatients();

  // Fetch patients on component mount
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Navigate to add new patient page
  const handleAddNewPatient = () => {
    navigate('/appointment/patient-registration');
  };

  // Navigate to view patient details
  const handleViewPatient = (patientId) => {
    navigate(`/emr/patient-records/${patientId}`);
  };

  // Navigate to edit patient
  const handleEditPatient = (patientId) => {
    navigate(`/appointment/patient-registration/${patientId}`);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (patient) => {
    setPatientToDelete(patient);
    setDeleteDialogOpen(true);
  };

  // Delete patient
  const confirmDelete = async () => {
    if (!patientToDelete) return;
    
    const result = await deletePatient(patientToDelete.id);
    
    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? 'success' : 'error'
    });
    
    setDeleteDialogOpen(false);
    setPatientToDelete(null);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box>
      {/* Page Header */}
      <PageHeader 
        title="Patients" 
        onAddNew={handleAddNewPatient} 
      />
      
      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 3, borderTop: '4px solid #4CAF50' }}>
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          showFilters={showFilters}
          onToggleFilters={toggleFilters}
        />
        
        {showFilters && (
          <AdvancedFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        )}
      </Paper>
      
      {/* Patient Table */}
      <Paper sx={{ borderTop: '4px solid #4CAF50' }}>
        <PatientTable 
          loading={loading}
          error={error}
          patients={filteredPatients}
          onViewPatient={handleViewPatient}
          onEditPatient={handleEditPatient}
          onDeletePatient={handleDeleteClick}
          onRetry={fetchPatients}
        />
      </Paper>
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog 
        open={deleteDialogOpen}
        patient={patientToDelete}
        loading={loading}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
      
      {/* Snackbar for notifications */}
      <NotificationSnackbar 
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default PatientsPage;