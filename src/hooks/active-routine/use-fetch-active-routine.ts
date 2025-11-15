import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ActiveRoutine } from '../use-workout-data';

async function fetchActiveRoutine(): Promise<ActiveRoutine> {
  try {
    const { data } = await axios.get<ActiveRoutine>(
      `${import.meta.env.VITE_API_URL}/api/routine/active`,
      { withCredentials: true },
    );
    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useFetchActiveRoutine(enabled: boolean) {
  return useQuery({
    queryKey: ['activeRoutine'],
    queryFn: fetchActiveRoutine,
    enabled,
  });
}
