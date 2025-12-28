import { Routine } from '../../types/routine';
import { api } from '../api';

export type RoutineCountResponse = { count: number };

export async function fetchRoutineCount() {
  const { data } = await api.get<RoutineCountResponse>('/routine/count');

  if (data) return data;
}

export async function fetchActiveRoutine(routineCount?: number) {
  if (routineCount) {
    if (routineCount > 0) {
      const { data } = await api.get<Routine>('/routine/active');

      if (data) return data;
    } else {
      return;
    }
  } else {
    const { data } = await api.get<Routine>('/routine/active');

    if (data) return data;
  }
}
