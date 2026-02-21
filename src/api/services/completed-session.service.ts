import { api } from '../api';

export async function fetchCompletedSessionIdsForCurrentDay() {
  const userUTCDateTime = new Date();
  const { data } = await api.get<string[]>(`/completed-session/list`, {
    params: { userUtcDateTime: userUTCDateTime.toISOString() },
  });

  return data;
}

export async function completeActiveSession(sessionId: string) {
  await api.post(`/completed-session`, {
    sessionId,
  });
}
