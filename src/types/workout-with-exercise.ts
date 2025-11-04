import type { Exercise } from './exercise';
import type { Workout } from './workout';

export type WorkoutWithExercise = Workout & {
  exercise: Exercise;
};
