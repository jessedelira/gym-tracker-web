import { useQuery } from '@tanstack/react-query';
import type { Session } from '../../types/session';
import api from '../../utils/axios';

async function fetchAllSessions(): Promise<Session[]> {
  const { data } = await api.get<Session[]>(`/api/session/all`);
  return data;
}

export function useFetchAllSessions() {
  return useQuery({
    queryKey: ['allSessions'],
    queryFn: () => fetchAllSessions(),
  });
}
