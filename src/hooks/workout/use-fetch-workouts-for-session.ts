import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';
import type { Workout } from '../../types/workout';

async function fetchWorkoutsForSession(sessionId: string): Promise<Workout[]> {
  const { data } = await api.get<Workout[]>(
    `/api/workout/session/${sessionId}`,
  );
  return data;
}

export function useFetchWorkoutsForSession(sessionId?: string) {
  return useQuery({
    queryKey: ['workouts', sessionId],
    queryFn: () => fetchWorkoutsForSession(sessionId!),
    enabled: !!sessionId,
  });
}
