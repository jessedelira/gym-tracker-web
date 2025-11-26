import { useMutation } from '@tanstack/react-query';
import api from '../../utils/axios';

async function completeSession(sessionId: string): Promise<void> {
  await api.post('/api/completed-session', { sessionId });
}

export function useCompleteSession() {
  return useMutation({
    mutationFn: completeSession,
  });
}
