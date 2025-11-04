import type { ExerciseType } from './exercise-type';

export type Exercise = {
  name: string;
  id: string;
  description: string | null;
  type: ExerciseType;
};
