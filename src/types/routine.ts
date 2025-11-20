import type { Session } from './session';

export type Routine = {
  id: string;
  createdAt: string; // ISO date string from API
  name: string;
  description: string;
  isActive: boolean;
  userId: string;
  sessions?: Session[];
};
