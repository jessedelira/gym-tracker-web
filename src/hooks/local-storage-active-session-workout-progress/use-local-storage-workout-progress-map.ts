import { useState, useCallback, useMemo } from 'react';
import type { Workout } from '../../types/workout';

export type WorkoutCompletionMap = Record<string, boolean>;

export function useLocalStorageWorkoutProgress(workouts?: Workout[]) {

  // --- 1. Initialize from localStorage OR create new map ---
  const initialMap = useMemo(() => {
    if (!workouts?.length) return {};

    const stored = localStorage.getItem('workoutCompletionMap');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as WorkoutCompletionMap;
        const allIdsPresent =
          workouts.every(w => w.id in parsed) &&
          Object.keys(parsed).length === workouts.length;

        if (allIdsPresent) return parsed;
      } catch {
        console.warn('⚠️ Invalid stored workoutCompletionMap, resetting...');
      }
    }

    return Object.fromEntries(workouts.map(w => [w.id, false]));
  }, [workouts]);

  // --- 2. State initialized without effects ---
  const [workoutProgressMap, setWorkoutProgressMap] =
    useState<WorkoutCompletionMap>(initialMap);

  const [isEveryWorkoutComplete, setIsEveryWorkoutComplete] = useState(
    Object.values(initialMap).every(Boolean)
  );

  // --- 3. Update workout ---
  const updateWorkoutProgress = useCallback(
    (workoutId: string, isComplete: boolean) => {
      setWorkoutProgressMap(prev => {
        const updated = { ...prev, [workoutId]: isComplete };
        localStorage.setItem('workoutCompletionMap', JSON.stringify(updated));
        setIsEveryWorkoutComplete(Object.values(updated).every(Boolean));
        return updated;
      });
    },
    []
  );

  // --- 4. Reset ---
  const resetWorkoutProgress = useCallback(() => {
    localStorage.removeItem('workoutCompletionMap');
    setWorkoutProgressMap({});
    setIsEveryWorkoutComplete(false);
  }, []);

  return {
    workoutProgressMap,
    isEveryWorkoutComplete,
    updateWorkoutProgress,
    resetWorkoutProgress,
  };
}
