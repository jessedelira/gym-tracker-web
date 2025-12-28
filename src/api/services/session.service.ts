import { Session } from '../../types/session';
import { api } from '../api';

export async function fetchSessionsForCurrentDay(enabled: boolean) {
  if (enabled) {
    const { data } = await api.get<Session[]>(`session/active-on-date`, {
      params: { date: new Date().toISOString() },
    });

    if (data) return data;
  } else {
    return;
  }
}

export async function startSession(sessionId: string) {
  await api.post('/active-session', { sessionId });
}
