import { ActiveSession } from '../../types/active-session';
import { api } from '../api';

export async function fetchActiveSession() {
  const { data } = await api.get<ActiveSession>('/active-session');

  return data;
}
