import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../utils/axios';

async function removeActiveRoutine(userId: string): Promise<void> {
  await api.post('/api/routine/remove-active', { userId });
}

export function useRemoveActiveRoutine(userId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      if (userId === undefined) {
        throw new Error('Cannot submit request without user ID');
      }
      return removeActiveRoutine(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeRoutine'] });
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });
}
