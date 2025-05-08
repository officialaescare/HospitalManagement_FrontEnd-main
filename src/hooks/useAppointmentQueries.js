// Custom hook for appointment queries
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAppointments, getMockAppointments, bookAppointment } from '../queries/appointmentQueries';

export const useAppointments = (filters = {}, options = {}) => {
  // For development, use mock data
  // Set to false to use the real API
  const useMockData = false;

  return useQuery({
    queryKey: ['appointments', filters],
    queryFn: () => useMockData ? getMockAppointments() : fetchAppointments(filters),
    ...options,
  });
};

// This hook now uses the same data source as useAppointments
export const useAppointmentStats = (date, doctorId, options = {}) => {
  return useQuery({
    queryKey: ['appointments', { date, doctorId }],
    queryFn: () => fetchAppointments({ date, doctorId }),
    select: (data) => data.stats, // Extract only the stats from the response
    ...options,
  });
};

// Hook for booking a new appointment
export const useBookAppointment = (options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: (data, variables) => {
      // Invalidate appointments queries to refetch data
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      
      // Call onSuccess callback if provided
      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
    ...options,
  });
};