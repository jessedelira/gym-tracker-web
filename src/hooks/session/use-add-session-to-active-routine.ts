import { useMutation } from '@tanstack/react-query';
import api from '../../utils/axios';

type AddSessionToActiveRoutineDto = {
  sessionId: string;
};

export async function addSessionToActiveRoutine(
  dto: AddSessionToActiveRoutineDto,
) {
  const { data } = await api.post('api/routine/add-session-active', dto);

  return data;
}

export function useAddSessionToActiveRoutine() {
  return useMutation({
    mutationFn: addSessionToActiveRoutine,
  });
}
