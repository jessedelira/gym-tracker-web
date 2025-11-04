import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type ActiveRoutine = {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  isActive: boolean;
  userId: string;
} | null;

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
