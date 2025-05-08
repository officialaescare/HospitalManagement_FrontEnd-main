// Custom hook for doctor availability queries
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchDoctorAvailability, 
  createDoctorAvailability, 
  updateDoctorAvailability, 
  deleteDoctorAvailability,
  fetchDoctorCalendar,
  createDoctorCalendar,
  updateDoctorCalendar,
  deleteDoctorCalendar
} from '../queries/doctorAvailabilityQueries';

// Hook to fetch doctor availability
export const useDoctorAvailability = (doctorId, options = {}) => {
  return useQuery({
    queryKey: ['doctorAvailability', doctorId],
    queryFn: () => fetchDoctorAvailability(doctorId),
    enabled: !!doctorId, // Only run the query if doctorId is provided
    select: (data) => {
      // Ensure we always return an array, even if the API returns null or undefined
      return Array.isArray(data) ? data : [];
    },
    ...options,
  });
};

// Hook to create doctor availability
export const useCreateDoctorAvailability = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createDoctorAvailability,
    onSuccess: (data, variables) => {
      // Invalidate and refetch the doctor availability query
      queryClient.invalidateQueries({ queryKey: ['doctorAvailability', variables.doctorId] });
    },
  });
};

// Hook to update doctor availability
export const useUpdateDoctorAvailability = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ availabilityId, data }) => updateDoctorAvailability(availabilityId, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch the doctor availability query
      queryClient.invalidateQueries({ queryKey: ['doctorAvailability', variables.data.doctorId] });
    },
  });
};

// Hook to delete doctor availability
export const useDeleteDoctorAvailability = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteDoctorAvailability,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch all doctor availability queries
      // Since we don't know which doctor this availability belongs to from just the ID
      queryClient.invalidateQueries({ queryKey: ['doctorAvailability'] });
    },
  });
};

// ===== Doctor Calendar Hooks =====

// Hook to fetch doctor calendar
export const useDoctorCalendar = (doctorId, options = {}) => {
  return useQuery({
    queryKey: ['doctorCalendar', doctorId],
    queryFn: () => fetchDoctorCalendar(doctorId),
    enabled: !!doctorId, // Only run the query if doctorId is provided
    select: (data) => {
      // Ensure we always return an array, even if the API returns null or undefined
      return Array.isArray(data) ? data : [];
    },
    ...options,
  });
};

// Hook to create doctor calendar
export const useCreateDoctorCalendar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createDoctorCalendar,
    onSuccess: (data, variables) => {
      // Invalidate and refetch the doctor calendar query
      queryClient.invalidateQueries({ queryKey: ['doctorCalendar', variables.DA_doctor_id] });
    },
  });
};

// Hook to update doctor calendar
export const useUpdateDoctorCalendar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ calendarId, data }) => updateDoctorCalendar(calendarId, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch the doctor calendar query
      queryClient.invalidateQueries({ queryKey: ['doctorCalendar', variables.data.DA_doctor_id] });
    },
  });
};

// Hook to delete doctor calendar
export const useDeleteDoctorCalendar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteDoctorCalendar,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch all doctor calendar queries
      queryClient.invalidateQueries({ queryKey: ['doctorCalendar'] });
    },
  });
};