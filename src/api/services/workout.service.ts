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

// TODO: you will now send a request to the endpoint (not async, just synch), but on the client we will also be updating the values so that you don't have to refresh
export function setWorkoutToCompleted(workoutId: string) {
  api.post(`workout/completed/${workoutId}/true`);
}

export function setWorkoutToNotCompleted(workoutId: string) {
  api.post(`workout/completed/${workoutId}/false`);
}
