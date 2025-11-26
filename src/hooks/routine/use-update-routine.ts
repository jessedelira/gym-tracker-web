import { useMutation } from '@tanstack/react-query';
import api from '../../utils/axios';

export type UpdateRoutineDto = {
  routineId: string;
  name: string;
  description: string | null;
  sessionIds: string[];
};

async function updateRoutine(dto: UpdateRoutineDto): Promise<void> {
  await api.patch('/api/routine/update', dto);
}

export function useUpdateRoutine() {
  return useMutation({
    mutationFn: updateRoutine,
  });
}
