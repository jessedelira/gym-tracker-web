import { ActiveSession } from '../../types/active-session';
import { Workout } from '../../types/workout';
import { api } from '../api';

export async function fetchWorkoutsForActiveSession(
  activeSession: ActiveSession,
) {
  if (activeSession) {
    const { data } = await api.get<Workout[]>(
      `workout/session/${activeSession.sessionId}`,
    );

    if (data) return data;
  } else {
    return;
  }
}

export function setWorkoutToCompleteBasedOnValue(
  workoutId: string,
  isComplete: boolean,
) {
  api.post(`workout/completed/${workoutId}/${isComplete}`);
}
