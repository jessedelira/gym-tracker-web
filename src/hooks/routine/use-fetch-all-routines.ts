import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';
import type { Routine } from '../../types/routine';

async function fetchAllRoutines(userId: string): Promise<Routine[]> {
  const { data } = await api.get<Routine[]>(`/api/routine/list/${userId}`);
  return data;
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
    enabled: !!userId,
  });
}
