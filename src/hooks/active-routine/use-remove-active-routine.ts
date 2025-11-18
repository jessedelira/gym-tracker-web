import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

async function removeActiveRoutine(userId?: string): Promise<void> {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/routine/remove-active`,
      {
        userId: userId,
      },
      { withCredentials: true },
    );
  } catch {
    throw new Error('Unexpected error occurred');
  }
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
      // Invalidate and refetch active routine and routines queries
      queryClient.invalidateQueries({ queryKey: ['activeRoutine'] });
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });
}
