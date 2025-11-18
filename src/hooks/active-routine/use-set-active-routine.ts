import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface SetActiveRoutineParams {
  routineId: string;
}

async function setActiveRoutine({
  routineId,
}: SetActiveRoutineParams): Promise<void> {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/routine/set-active`,
      { routineId },
      { withCredentials: true },
    );
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useSetActiveRoutine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setActiveRoutine,
    onSuccess: () => {
      // Invalidate and refetch active routine and routines queries
      queryClient.invalidateQueries({ queryKey: ['activeRoutine'] });
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });
}
