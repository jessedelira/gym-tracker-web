import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type RoutineCountResponse = { count: number };

async function fetchRoutineCount(): Promise<RoutineCountResponse> {
  try {
    const { data } = await axios.get<RoutineCountResponse>(
      `${import.meta.env.VITE_API_URL}/api/routine/count`,
      { withCredentials: true },
    );
    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useFetchRoutineCount() {
  return useQuery({
    queryKey: ['routineCount'],
    queryFn: fetchRoutineCount,
  });
}
