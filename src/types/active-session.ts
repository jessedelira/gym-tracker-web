import type { Session } from './session';

export type ActiveSession = {
  id: string;
  sessionId: string;
  userId: string;
  startedAt: string;
  session?: Session;
};
