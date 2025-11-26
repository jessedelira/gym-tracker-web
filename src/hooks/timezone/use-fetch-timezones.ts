import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';
import type { TimezoneMap } from '../../types/timezone-map';

async function fetchTimezones(): Promise<TimezoneMap[]> {
  const { data } = await api.get<TimezoneMap[]>('/api/timezone');
  return data;
}

export function useFetchTimezones() {
  return useQuery({
    queryKey: ['timezones'],
    queryFn: fetchTimezones,
  });
}
