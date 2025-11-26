import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';
import type { Session } from '../../types/session';

async function fetchSessionsWithNoRoutine(): Promise<Session[]> {
  const { data } = await api.get<Session[]>('/api/session/not-in-routine');
  return data;
}

export function useFetchSessionsWithNoRoutine() {
  return useQuery({
    queryKey: ['sessionsWithNoRoutine'],
    queryFn: fetchSessionsWithNoRoutine,
  });
}
