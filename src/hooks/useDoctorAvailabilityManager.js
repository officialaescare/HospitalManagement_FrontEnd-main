import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';

export const useDoctorAvailabilityManager = (
  selectedDoctor,
  availabilityResponse,
  isLoadingAvailability,
  isAvailabilityError,
  createAvailability,
  updateAvailability,
  deleteAvailability
) => {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Update local state when availability data is fetched
  useEffect(() => {
    if (availabilityResponse) {
      // Ensure we're working with an array
      const data = Array.isArray(availabilityResponse) ? availabilityResponse : 
                  (availabilityResponse?.data && Array.isArray(availabilityResponse.data)) ? 
                  availabilityResponse.data : [];
      
      // Convert string time to Date objects for the TimePicker
      // Handle both API response formats (with fromTime/toTime or dA_start_time/dA_end_time)
      const formattedData = data.map(item => ({
        ...item,
        // Map API fields to component fields
        id: item.id || item.dA_id,
        doctorId: item.doctorId || item.dA_doctor_id,
        isTeleconsult: item.isTeleconsult !== undefined ? item.isTeleconsult : item.dA_is_teleconsultant,
        fromTime: parseTimeString(item.fromTime || item.dA_start_time),
        toTime: parseTimeString(item.toTime || item.dA_end_time),
        maxPatients: item.maxPatients || Math.floor(60 / (item.dA_time_interval || 30)),
        // If days object doesn't exist, create a default one based on day_Id
        days: item.days || createDefaultDaysObject(item.day_Id)
      }));
      
      setAvailabilityData(formattedData);
    }
  }, [availabilityResponse]);

  // Helper function to create a default days object based on day_Id
  const createDefaultDaysObject = (dayId) => {
    const days = {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false
    };
    
    // Map day_Id (1-7) to the corresponding day of the week
    if (dayId === 1) days.monday = true;
    else if (dayId === 2) days.tuesday = true;
    else if (dayId === 3) days.wednesday = true;
    else if (dayId === 4) days.thursday = true;
    else if (dayId === 5) days.friday = true;
    else if (dayId === 6) days.saturday = true;
    else if (dayId === 7) days.sunday = true;
    
    return days;
  };

  // Helper function to parse time string to Date object
  const parseTimeString = (timeString) => {
    if (!timeString) return new Date('2023-01-01T09:00:00');
    try {
      // Assuming timeString is in format "HH:MM:SS"
      const [hours, minutes, seconds] = timeString.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      date.setSeconds(parseInt(seconds, 10));
      return date;
    } catch (error) {
      console.error('Error parsing time string:', error);
      return new Date('2023-01-01T09:00:00');
    }
  };

  // Helper function to format Date to time string
  const formatTimeToString = (date) => {
    if (!date) return null;
    try {
      return format(date, 'HH:mm:ss');
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  // Add a new row to the availability data
  const addNewRow = useCallback(() => {
    const newRow = {
      id: Date.now(), // Use timestamp as temporary ID
      doctorId: selectedDoctor,
      dA_doctor_id: selectedDoctor,
      branchId: 1, // Default branch
      dA_branch_id: 1,
      isTeleconsult: false,
      dA_is_teleconsultant: false,
      fromTime: new Date('2023-01-01T09:00:00'),
      toTime: new Date('2023-01-01T17:00:00'),
      maxPatients: 10,
      timeInterval: 30,
      dA_time_interval: 30,
      days: {
        sunday: false,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false
      },
      day_Id: 1, // Monday
      isNew: true // Flag to identify new rows
    };
    
    setAvailabilityData(prev => [...prev, newRow]);
  }, [selectedDoctor]);

  // Delete a row from the availability data
  const deleteRow = useCallback((id) => {
    const rowToDelete = availabilityData.find(row => row.id === id);
    
    // If it's a new row (not saved to backend), just remove from state
    if (rowToDelete.isNew) {
      const updatedData = availabilityData.filter(row => row.id !== id);
      setAvailabilityData(updatedData);
      showSnackbar('Time slot removed');
      return;
    }
    
    // Otherwise, call the delete mutation
    deleteAvailability.mutate(id, {
      onSuccess: () => {
        const updatedData = availabilityData.filter(row => row.id !== id);
        setAvailabilityData(updatedData);
        showSnackbar('Time slot deleted successfully');
      },
      onError: (error) => {
        console.error('Error deleting time slot:', error);
        showSnackbar('Failed to delete time slot', 'error');
      }
    });
  }, [availabilityData, deleteAvailability]);

  // Handle field changes in the availability data
  const handleFieldChange = useCallback((id, field, value) => {
    setAvailabilityData(prev => prev.map(row => {
      if (row.id === id) {
        if (field.startsWith('days.')) {
          const day = field.split('.')[1];
          return {
            ...row,
            days: {
              ...row.days,
              [day]: value
            }
          };
        }
        return { ...row, [field]: value };
      }
      return row;
    }));
  }, []);

  // Save availability data to the backend
  const saveAvailability = useCallback(async () => {
    if (!selectedDoctor) {
      showSnackbar('Please select a doctor first', 'warning');
      return;
    }
    
    try {
      // Process each row
      for (const row of availabilityData) {
        // Format the data for API based on the new endpoint format
        const formattedRow = {
          // Map component fields to API fields
          DA_doctor_id: selectedDoctor,
          DA_branch_id: row.branchId || 1, // Default to branch 1 if not specified
          DA_start_time: formatTimeToString(row.fromTime),
          DA_end_time: formatTimeToString(row.toTime),
          DA_status: 1,
          DA_time_interval: row.timeInterval || 30, // Default to 30 min if not specified
          Day_Id: getDayIdFromDaysObject(row.days),
          DA_is_teleconsultant: row.isTeleconsult
        };
        
        // If it's a new row, create it
        if (row.isNew) {
          await createAvailability.mutateAsync(formattedRow);
        } 
        // Otherwise, update it
        else {
          await updateAvailability.mutateAsync({
            availabilityId: row.id,
            data: formattedRow
          });
        }
      }
      
      showSnackbar('Availability saved successfully');
    } catch (error) {
      console.error('Error saving doctor availability:', error);
      showSnackbar('Failed to save availability', 'error');
    }
  }, [availabilityData, selectedDoctor, createAvailability, updateAvailability]);
  
  // Helper function to get day_Id from days object
  const getDayIdFromDaysObject = (days) => {
    if (days.monday) return 1;
    if (days.tuesday) return 2;
    if (days.wednesday) return 3;
    if (days.thursday) return 4;
    if (days.friday) return 5;
    if (days.saturday) return 6;
    if (days.sunday) return 7;
    return 1; // Default to Monday
  };

  // Show a snackbar notification
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return {
    availabilityData,
    snackbar,
    addNewRow,
    deleteRow,
    handleFieldChange,
    saveAvailability,
    handleCloseSnackbar
  };
};