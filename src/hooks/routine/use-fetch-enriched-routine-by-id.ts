import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';
import type { Routine } from '../../types/routine';

async function fetchEnrichedRoutineById(routineId: string): Promise<Routine> {
  const { data } = await api.get<Routine>(`/api/routine/${routineId}`);
  return data;
}

export function useFetchEnrichedRoutineById(routineId: string) {
  return useQuery({
    queryKey: ['routineById'],
    queryFn: () => fetchEnrichedRoutineById(routineId),
  });
}
