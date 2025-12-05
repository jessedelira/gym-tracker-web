import { useMutation } from '@tanstack/react-query';
import type { DayOfWeek } from '../../types/days';
import type { Session } from '../../types/session';
import api from '../../utils/axios';

export type CreateSessionDto = {
  name: string;
  description: string;
  days: DayOfWeek[];
  workouts: {
    exerciseId: string;
    weightLbs: number | null;
    reps: number | null;
    sets: number | null;
    durationSeconds: number | null;
  }[];
};

async function createSession(createSessionDto: CreateSessionDto) {
  const { data } = await api.post<Session>('api/session', createSessionDto);

  return data;
}

export function useCreateSession() {
  return useMutation({
    mutationFn: createSession,
  });
}
