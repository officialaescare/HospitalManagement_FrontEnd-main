// API Endpoints for HMS
// This file contains all API endpoints used in the application

// Base URLs
export const BASE_URL = 'https://localhost:7162/api';

// Doctor endpoints
export const DOCTORS_API = {
  GET_ALL: `${BASE_URL}/doctorsapi/doctors`,
  GET_BY_ID: (id) => `${BASE_URL}/doctorsapi/doctors/${id}`,
  CREATE: `${BASE_URL}/doctorsapi/doctors`,
  UPDATE: (id) => `${BASE_URL}/doctorsapi/doctors/${id}`,
  DELETE: (id) => `${BASE_URL}/doctorsapi/doctors/${id}`,
};

// Appointment endpoints
export const APPOINTMENTS_API = {
  GET_ALL: `${BASE_URL}/appointments`,
  GET_BY_ID: (id) => `${BASE_URL}/appointments/${id}`,
  CREATE: `${BASE_URL}/appointments`,
  UPDATE: (id) => `${BASE_URL}/appointments/${id}`,
  DELETE: (id) => `${BASE_URL}/appointments/${id}`,
  GET_STATS: `${BASE_URL}/appointments/stats`,
};

// Patient endpoints
export const PATIENTS_API = {
  GET_ALL: `${BASE_URL}/patients`,
  GET_BY_ID: (id) => `${BASE_URL}/patients/${id}`,
  CREATE: `${BASE_URL}/patients`,
  UPDATE: (id) => `${BASE_URL}/patients/${id}`,
  DELETE: (id) => `${BASE_URL}/patients/${id}`,
};

// Doctor Availability endpoints
export const DOCTOR_AVAILABILITY_API = {  
  // Doctor Calendar endpoints
  ADD_CALENDAR: `${BASE_URL}/doctorsapi/add-doctor-calendar`,
  GET_CALENDAR: (doctorId) => `${BASE_URL}/doctorsapi/get-doctor-calendar/${doctorId}`,
  UPDATE_CALENDAR: (id) => `${BASE_URL}/doctorsapi/update-doctor-calendar/${id}`,
  DELETE_CALENDAR: (id) => `${BASE_URL}/doctorsapi/delete-doctor-calendar/${id}`,
};

// Add more endpoint categories as needed