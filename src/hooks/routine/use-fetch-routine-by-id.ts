import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Routine } from '../../types/routine';

async function fetchRoutineById(routineId: string): Promise<Routine> {
  try {
    const { data } = await axios.get<Routine>(
      `${import.meta.env.VITE_API_URL}/api/routine/${routineId}`,
      { withCredentials: true },
    );

    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useFetchRoutineById(routineId: string) {
  return useQuery({
    queryKey: ['routineById'],
    queryFn: () => fetchRoutineById(routineId),
  });
}
