import React, { useState } from 'react';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Import custom components
import DoctorHeader from '../../components/doctor/DoctorHeader';
import ViewModeToggle from '../../components/doctor/ViewModeToggle';
import AvailabilityTable from '../../components/doctor/AvailabilityTable';
import DateWiseView from '../../components/doctor/DateWiseView';
import NotificationSnackbar from '../../components/common/NotificationSnackbar';

// Import custom hooks
import { useDoctors } from '../../hooks/useDoctorQueries';
import { 
  useDoctorAvailability,
  useCreateDoctorAvailability,
  useUpdateDoctorAvailability,
  useDeleteDoctorAvailability
} from '../../hooks/useDoctorAvailabilityQueries';
import { useDoctorAvailabilityManager } from '../../hooks/useDoctorAvailabilityManager';

const DoctorAvailabilityPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [viewMode, setViewMode] = useState('day');

  // Fetch doctors using the custom hook
  const { data: doctorsData, isLoading: isLoadingDoctors } = useDoctors();
  const doctors = doctorsData?.data || [];

  // Fetch doctor availability using the custom hook
  const { 
    data: availabilityResponse, 
    isLoading: isLoadingAvailability,
    isError: isAvailabilityError
  } = useDoctorAvailability(selectedDoctor);

  // Mutations for CRUD operations
  const createAvailability = useCreateDoctorAvailability();
  const updateAvailability = useUpdateDoctorAvailability();
  const deleteAvailability = useDeleteDoctorAvailability();

  // Use the custom hook for managing doctor availability
  const {
    availabilityData,
    snackbar,
    addNewRow,
    deleteRow,
    handleFieldChange,
    saveAvailability,
    handleCloseSnackbar
  } = useDoctorAvailabilityManager(
    selectedDoctor,
    availabilityResponse,
    isLoadingAvailability,
    isAvailabilityError,
    createAvailability,
    updateAvailability,
    deleteAvailability
  );

  // Handle doctor selection change
  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  // Handle view mode change
  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        {/* Doctor Selection Header */}
        <DoctorHeader 
          title="Doctor's Calendar"
          selectedDoctor={selectedDoctor}
          doctors={doctors}
          isLoading={isLoadingDoctors}
          onChange={handleDoctorChange}
        />
        
        {/* View Mode Toggle and Save Button */}
        <ViewModeToggle 
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onSave={saveAvailability}
          isSaving={createAvailability.isLoading || updateAvailability.isLoading}
          isDisabled={!selectedDoctor}
        />
        
        {/* Day-wise View */}
        {viewMode === 'day' && (
          <AvailabilityTable 
            availabilityData={availabilityData}
            isLoading={isLoadingAvailability}
            isError={isAvailabilityError}
            selectedDoctor={selectedDoctor}
            onFieldChange={handleFieldChange}
            onDeleteRow={deleteRow}
            onAddRow={addNewRow}
            isDeleting={deleteAvailability.isLoading}
          />
        )}
        
        {/* Date-wise View */}
        {viewMode === 'date' && (
          <DateWiseView selectedDoctor={selectedDoctor} />
        )}
        
        {/* Notification Snackbar */}
        <NotificationSnackbar 
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DoctorAvailabilityPage;