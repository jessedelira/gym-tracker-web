import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Routine } from '../../types/routine';

async function fetchActiveRoutine(): Promise<Routine> {
  try {
    const { data } = await axios.get<Routine>(
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
