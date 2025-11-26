import { useMutation } from '@tanstack/react-query';
import api from '../../utils/axios';

interface SetActiveRoutineParams {
  routineId: string;
}

async function setActiveRoutine({
  routineId,
}: SetActiveRoutineParams): Promise<void> {
  await api.post('/api/routine/set-active', { routineId });
}

export function useSetActiveRoutine() {
  return useMutation({
    mutationFn: setActiveRoutine,
  });
}
