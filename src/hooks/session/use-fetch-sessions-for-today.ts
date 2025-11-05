import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Session } from '../../types/session';

export async function fetchSessionsForToday(): Promise<Session[]> {
  const { data } = await axios.get<Session[]>(
    `${import.meta.env.VITE_API_URL}/api/session/active-on-date`,
    {
      withCredentials: true,
      params: { date: new Date().toISOString() },
    },
  );

  return data;
}

export function useFetchSessionsForToday(enabled: boolean) {
  return useQuery({
    queryKey: ['sessionsForToday'],
    queryFn: fetchSessionsForToday,
    enabled,
  });
}
