import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';
import type { Session } from '../../types/session';

async function fetchSessionsForToday(): Promise<Session[]> {
  const { data } = await api.get<Session[]>('/api/session/active-on-date', {
    params: { date: new Date().toISOString() },
  });
  return data;
}

export function useFetchSessionsForToday(enabled: boolean) {
  return useQuery({
    queryKey: ['sessionsForToday'],
    queryFn: fetchSessionsForToday,
    enabled,
  });
}
