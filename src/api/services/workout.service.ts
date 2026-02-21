import { ActiveSession } from '../../types/active-session';
import { Workout } from '../../types/workout';
import { api } from '../api';

export async function fetchWorkoutsForActiveSession(
  activeSession: ActiveSession,
) {
  const { data } = await api.get<Workout[]>(
    `workout/session/${activeSession.sessionId}`,
  );

  return data;
}

export function setWorkoutToCompleteBasedOnValue(
  workoutId: string,
  isComplete: boolean,
) {
  api.post(`workout/completed/${workoutId}/${isComplete}`);
}
