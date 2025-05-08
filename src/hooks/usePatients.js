import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { PATIENTS_API } from '../api/endpoints';

// Mock data for patients (used if API fails)
const mockPatients = [
  { id: 'PT001', name: 'John Smith', age: 45, gender: 'Male', phone: '555-123-4567', email: 'john.smith@example.com', bloodGroup: 'O+', lastVisit: '2023-04-10' },
  { id: 'PT002', name: 'Sarah Johnson', age: 32, gender: 'Female', phone: '555-234-5678', email: 'sarah.j@example.com', bloodGroup: 'A+', lastVisit: '2023-04-12' },
  { id: 'PT003', name: 'Michael Brown', age: 58, gender: 'Male', phone: '555-345-6789', email: 'mbrown@example.com', bloodGroup: 'B-', lastVisit: '2023-04-05' },
  { id: 'PT004', name: 'Emily Davis', age: 27, gender: 'Female', phone: '555-456-7890', email: 'emily.d@example.com', bloodGroup: 'AB+', lastVisit: '2023-04-15' },
  { id: 'PT005', name: 'Robert Wilson', age: 63, gender: 'Male', phone: '555-567-8901', email: 'rwilson@example.com', bloodGroup: 'O-', lastVisit: '2023-04-08' },
  { id: 'PT006', name: 'Jennifer Lee', age: 41, gender: 'Female', phone: '555-678-9012', email: 'jlee@example.com', bloodGroup: 'A-', lastVisit: '2023-04-11' },
  { id: 'PT007', name: 'David Miller', age: 52, gender: 'Male', phone: '555-789-0123', email: 'dmiller@example.com', bloodGroup: 'B+', lastVisit: '2023-04-09' },
];

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    ageFrom: '',
    ageTo: '',
    bloodGroup: ''
  });

  // Fetch patients from API
  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(PATIENTS_API.GET_ALL);
      // For demo purposes, if API is not available, use mock data
      if (response.data) {
        setPatients(response.data);
      } else {
        setPatients(mockPatients);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError('Failed to load patients. Please try again later.');
      // Use mock data for demo
      setPatients(mockPatients);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete patient
  const deletePatient = useCallback(async (patientId) => {
    setLoading(true);
    try {
      await axios.delete(PATIENTS_API.DELETE(patientId));
      
      // Remove from state
      setPatients(prev => prev.filter(p => p.id !== patientId));
      
      return { success: true, message: 'Patient deleted successfully' };
    } catch (err) {
      console.error('Error deleting patient:', err);
      return { success: false, message: 'Failed to delete patient. Please try again.' };
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter patients based on search term and filters
  useEffect(() => {
    let filtered = [...patients];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(patient => 
        patient.id?.toLowerCase().includes(term) ||
        patient.name?.toLowerCase().includes(term) ||
        patient.phone?.toLowerCase().includes(term) ||
        patient.email?.toLowerCase().includes(term)
      );
    }
    
    // Apply additional filters
    if (filters.gender) {
      filtered = filtered.filter(patient => patient.gender === filters.gender);
    }
    
    if (filters.ageFrom) {
      filtered = filtered.filter(patient => patient.age >= parseInt(filters.ageFrom));
    }
    
    if (filters.ageTo) {
      filtered = filtered.filter(patient => patient.age <= parseInt(filters.ageTo));
    }
    
    if (filters.bloodGroup) {
      filtered = filtered.filter(patient => patient.bloodGroup === filters.bloodGroup);
    }
    
    setFilteredPatients(filtered);
  }, [searchTerm, filters, patients]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      gender: '',
      ageFrom: '',
      ageTo: '',
      bloodGroup: ''
    });
    setSearchTerm('');
  };

  return {
    patients,
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
  };
};