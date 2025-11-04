export type Session = {
  name: string;
  id: string;
  userId: string;
  description: string | null;
  routineId: string | null;
  createdAt: Date;
};
