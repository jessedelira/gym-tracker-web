import { Session } from '../../types/session';
import { api } from '../api';

export async function fetchCompletedSessionIdsForCurrentDay(enabled: boolean) {
  if (enabled) {
    const userUTCDateTime = new Date();
    const { data } = await api.get<string[]>(`/completed-session/list`, {
      params: { userUtcDateTime: userUTCDateTime.toISOString() },
    });

    if (data) return data;
  } else {
    return;
  }
}

export async function completeActiveSession(sessionId: string) {
  await api.post(`/completed-session`, {
    sessionId,
  });
}
