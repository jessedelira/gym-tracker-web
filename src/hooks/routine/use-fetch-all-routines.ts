import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Routine } from '../../types/routine';

async function fetchAllRoutines(userId: string): Promise<Routine[]> {
  try {
    const { data } = await axios.get<Routine[]>(
      `${import.meta.env.VITE_API_URL}/api/routine/list/${userId}`,
      { withCredentials: true },
    );
    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useFetchAllRoutines(userId?: string) {
  return useQuery({
    queryKey: ['routines', userId],
    queryFn: () => {
      if (!userId) {
        throw new Error('User ID is required to fetch routines');
      }
      return fetchAllRoutines(userId);
    },
    enabled: !!userId, // Only run the query if userId exists
  });
}
