import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';

async function fetchCompletedSessionIds(
  userUTCDateTime: Date,
): Promise<string[]> {
  const { data } = await api.get<string[]>('/api/completed-session/list', {
    params: { userUtcDateTime: userUTCDateTime.toISOString() },
  });
  return data;
}

export function useFetchCompletedSessionIds(enabled: boolean) {
  return useQuery({
    queryKey: ['completedSessions', 'today'],
    queryFn: () => fetchCompletedSessionIds(new Date()),
    enabled,
  });
}
