import { useMutation } from '@tanstack/react-query';
import api from '../../utils/axios';
import type { Routine } from '../../types/routine';

export type CreateRoutineDto = {
  name: string;
  description: string | null;
  userId: string;
};

async function createRoutine(dto: CreateRoutineDto): Promise<Routine> {
  const { data } = await api.post<Routine>('/api/routine/create', dto);
  return data;
}

export function useCreateRoutine() {
  return useMutation({
    mutationFn: createRoutine,
  });
}
