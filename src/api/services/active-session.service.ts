import { ActiveSession } from '../../types/active-session';
import { Routine } from '../../types/routine';
import { api } from '../api';

export async function fetchActiveSession(routine: Routine) {
  if (routine) {
    const { data } = await api.get<ActiveSession>('/active-session');

    if (data) return data;
  } else {
    return;
  }
}
