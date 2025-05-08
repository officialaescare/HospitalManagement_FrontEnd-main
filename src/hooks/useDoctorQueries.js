// Custom hook for doctor queries
import { useQuery } from '@tanstack/react-query';
import { fetchDoctors, fetchDoctorById } from '../queries/doctorQueries';

export const useDoctors = (options = {}) => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors,
    ...options,
  });
};

export const useDoctorById = (doctorId, options = {}) => {
  return useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => fetchDoctorById(doctorId),
    enabled: !!doctorId, // Only run the query if doctorId is provided
    ...options,
  });
};