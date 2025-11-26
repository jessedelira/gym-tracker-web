import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';

export type RoutineCountResponse = { count: number };

async function fetchRoutineCount(): Promise<RoutineCountResponse> {
  const { data } = await api.get<RoutineCountResponse>('/api/routine/count');
  return data;
}

export function useFetchRoutineCount() {
  return useQuery({
    queryKey: ['routineCount'],
    queryFn: fetchRoutineCount,
  });
}
