// Doctor Query functions
import { externalApi } from '../api/axios';
import { DOCTORS_API } from '../api/endpoints';

// Fetch all doctors
export const fetchDoctors = async () => {
  try {
    const response = await externalApi.get(DOCTORS_API.GET_ALL);
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    // Return mock data if API fails (for development purposes)
    return getMockDoctors();
  }
};

// Fetch doctor by ID
export const fetchDoctorById = async (doctorId) => {
  try {
    const response = await externalApi.get(DOCTORS_API.GET_BY_ID(doctorId));
    
    if (!response.data) {
      throw new Error('Network error');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching doctor with ID ${doctorId}:`, error);
    throw error;
  }
};

// Mock data for development (will be removed in production)
export const getMockDoctors = () => {
  return {
    message: "doctors details successfully fetched",
    data: [
      {
        doctorId: 1,
        doctorName: "Dr. John Smith",
        specialization: "Cardiologist",
        branchId: 1
      },
      {
        doctorId: 2,
        doctorName: "Dr. Test User",
        specialization: "Dentist",
        branchId: 1
      },
      {
        doctorId: 3,
        doctorName: "Dr. Test User",
        specialization: "Dentist",
        branchId: 1
      }
    ]
  };
};