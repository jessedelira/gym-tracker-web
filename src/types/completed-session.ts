import type { Session } from './session';

export type CompletedSession = {
  id: string;
  startedAt: string;
  completedAt: string;
  percentageCompleted: number;
  sessionId: string;
  userId: string;
  session?: Session;
};
