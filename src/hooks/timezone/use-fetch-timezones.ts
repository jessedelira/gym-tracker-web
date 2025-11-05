import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { TimezoneMap } from '../../types/timezone-map';

async function fetchTimezones(): Promise<TimezoneMap[]> {
  try {
    const { data } = await axios.get<TimezoneMap[]>(
      `${import.meta.env.VITE_API_URL}/api/timezone`,
    );
    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useFetchTimezones() {
  return useQuery({
    queryKey: ['timezones'],
    queryFn: fetchTimezones,
  });
}
