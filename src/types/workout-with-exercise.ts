import type { Exercise } from './exercise';
import type { workout } from './workout';

export type WorkoutWithExercise = workout & {
  exercise: Exercise;
};
