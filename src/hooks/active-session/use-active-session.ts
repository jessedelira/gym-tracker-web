import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';
import type { ActiveSession } from '../../types/active-session';

async function fetchActiveSession(): Promise<ActiveSession> {
  const { data } = await api.get<ActiveSession>('/api/active-session');
  return data;
}

async function startActiveSession(sessionId: string): Promise<void> {
  await api.post('/api/active-session', { sessionId });
}

export function useFetchActiveSession(enabled: boolean) {
  return useQuery({
    queryKey: ['activeSession'],
    queryFn: fetchActiveSession,
    enabled,
  });
}

export function useStartActiveSession() {
  return useMutation({
    mutationFn: startActiveSession,
  });
}
