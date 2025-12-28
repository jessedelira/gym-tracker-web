import { ActiveSession } from '../../types/active-session';
import { Workout } from '../../types/workout';
import { api } from '../api';

export async function fetchWorkoutsForActiveSession(
  activeSession: ActiveSession,
) {
  if (activeSession) {
    const { data } = await api.get<Workout[]>(
      `workout/session/${activeSession.id}`,
    );

    if (data) return data;
  } else {
    return;
  }
}
