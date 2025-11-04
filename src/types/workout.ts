export type Workout = {
  id: string;
  reps: number | null;
  sets: number | null;
  weightLbs: number | null;
  durationSeconds: number | null;
  exerciseId: string;
  sessionId: string;
  userId: string;
};
