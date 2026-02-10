import { Routine } from '../../types/routine';
import { api } from '../api';

export type RoutineCountResponse = { count: number };

export async function fetchRoutineCount() {
  const { data } = await api.get<RoutineCountResponse>('/routine/count');

  return data;
}

export async function fetchActiveRoutine() {
  const { data } = await api.get<Routine>('/routine/active');
  return data;
}
