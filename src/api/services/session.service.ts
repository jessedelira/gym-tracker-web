import { Session } from '../../types/session';
import { api } from '../api';

export async function fetchSessionsForCurrentDay() {
  const { data } = await api.get<Session[]>(`session/active-on-date`, {
    params: { date: new Date().toISOString() },
  });

  return data;
}

export async function startSession(sessionId: string) {
  await api.post('/active-session', { sessionId });
}
