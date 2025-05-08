// Doctor Availability Query functions
import { externalApi } from '../api/axios';
import { DOCTOR_AVAILABILITY_API } from '../api/endpoints';

// Fetch doctor availability by doctor ID
export const fetchDoctorAvailability = async (doctorId) => {
  try {
    const response = await externalApi.get(DOCTOR_AVAILABILITY_API.GET_CALENDAR(doctorId));
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    // Ensure we always return an array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(`Error fetching availability for doctor ID ${doctorId}:`, error);
    // Return empty array instead of error to make UI more resilient
    return [];
  }
};

// Create doctor availability
export const createDoctorAvailability = async (availabilityData) => {
  try {
    const response = await externalApi.post(DOCTOR_AVAILABILITY_API.ADD_CALENDAR, availabilityData);
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error creating doctor availability:', error);
    throw error;
  }
};

// Update doctor availability
export const updateDoctorAvailability = async (availabilityId, availabilityData) => {
  try {
    const response = await externalApi.put(DOCTOR_AVAILABILITY_API.UPDATE_CALENDAR(availabilityId), availabilityData);
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error updating availability with ID ${availabilityId}:`, error);
    throw error;
  }
};

// Delete doctor availability
export const deleteDoctorAvailability = async (availabilityId) => {
  try {
    const response = await externalApi.delete(DOCTOR_AVAILABILITY_API.DELETE_CALENDAR(availabilityId));
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error deleting availability with ID ${availabilityId}:`, error);
    throw error;
  }
};

// ===== Doctor Calendar API Functions =====

// Fetch doctor calendar by doctor ID
export const fetchDoctorCalendar = async (doctorId) => {
  try {
    const response = await externalApi.get(DOCTOR_AVAILABILITY_API.GET_CALENDAR(doctorId));
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    // Ensure we always return an array, even if the API returns null or undefined
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(`Error fetching calendar for doctor ID ${doctorId}:`, error);
    // Return empty array instead of throwing error to make UI more resilient
    return [];
  }
};

// Create doctor calendar
export const createDoctorCalendar = async (calendarData) => {
  try {
    const response = await externalApi.post(DOCTOR_AVAILABILITY_API.ADD_CALENDAR, calendarData);
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error creating doctor calendar:', error);
    throw error;
  }
};

// Update doctor calendar
export const updateDoctorCalendar = async (calendarId, calendarData) => {
  try {
    const response = await externalApi.put(DOCTOR_AVAILABILITY_API.UPDATE_CALENDAR(calendarId), calendarData);
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error updating calendar with ID ${calendarId}:`, error);
    throw error;
  }
};

// Delete doctor calendar
export const deleteDoctorCalendar = async (calendarId) => {
  try {
    const response = await externalApi.delete(DOCTOR_AVAILABILITY_API.DELETE_CALENDAR(calendarId));
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error deleting calendar with ID ${calendarId}:`, error);
    throw error;
  }
};

// Mock data for development (will be removed in production)
export const getMockDoctorAvailability = (doctorId) => {
  return {
    message: "Doctor availability successfully fetched",
    data: [
      {
        id: 1,
        doctorId: doctorId,
        isTeleconsult: true,
        fromTime: "09:00:00",
        toTime: "12:00:00",
        maxPatients: 10,
        days: {
          sunday: false,
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false
        }
      },
      {
        id: 2,
        doctorId: doctorId,
        isTeleconsult: false,
        fromTime: "14:00:00",
        toTime: "17:00:00",
        maxPatients: 8,
        days: {
          sunday: false,
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false
        }
      }
    ]
  };
};