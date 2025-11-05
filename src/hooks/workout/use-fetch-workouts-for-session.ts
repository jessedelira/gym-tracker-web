import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Workout } from '../../types/workout';

async function fetchWorkoutsForSession(sessionId: string): Promise<Workout[]> {
  try {
    console.log(
      'sessionId inside of the fetch workouts for session',
      sessionId,
    );

    const { data } = await axios.get<Workout[]>(
      `${import.meta.env.VITE_API_URL}/api/workout/session/${sessionId}`,
      { withCredentials: true },
    );
    console.log('data here in the fetchWorkoutsForSession');
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
