import { useMutation } from '@tanstack/react-query';
import api from '../../utils/axios';

async function deleteSession(sessionId: string): Promise<void> {
  await api.delete(`/api/session/${sessionId}`);
}

export function useDeleteSession() {
  return useMutation({
    mutationFn: deleteSession,
  });
}
