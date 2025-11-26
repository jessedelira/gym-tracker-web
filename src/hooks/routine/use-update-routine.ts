import axios from 'axios';
import type { Routine } from '../../types/routine';
import { useMutation } from '@tanstack/react-query';

export type UpdateRoutineDto = {
  routineId: string;
  name: string;
  description: string | null;
  sessionIds: string[];
};

async function updateRoutine(dto: UpdateRoutineDto): Promise<void> {
  await axios.patch<Routine>(
    `${import.meta.env.VITE_API_URL}/api/routine/update`,
    dto,
    { withCredentials: true },
  );
}

export function useUpdateRoutine() {
  return useMutation({
    mutationFn: updateRoutine,
  });
}
