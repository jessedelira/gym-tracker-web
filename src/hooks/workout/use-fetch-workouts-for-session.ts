import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Workout } from '../../types/workout';

async function fetchWorkoutsForSession(sessionId: string): Promise<Workout[]> {
  try {
    const { data } = await axios.get<Workout[]>(
      `${import.meta.env.VITE_API_URL}/api/workout/session/${sessionId}`,
      { withCredentials: true },
    );

    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useFetchWorkoutsForSession(sessionId?: string) {
  return useQuery({
    queryKey: ['workouts', sessionId],
    queryFn: () => fetchWorkoutsForSession(sessionId!),
    enabled: !!sessionId,
  });
}
