// React Query hook
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../queries/userQueries';

export const useUserQuery = () => useQuery(['users'], fetchUsers);