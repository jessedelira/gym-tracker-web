import { useState, useEffect, useCallback } from 'react';
import type { Workout } from '../../types/workout';

// Each workout ID maps to whether it’s completed
export type WorkoutCompletionMap = Record<string, boolean>;

export function useLocalStorageWorkoutProgress(workouts?: Workout[]) {
  const [workoutProgressMap, setWorkoutProgressMap] =
    useState<WorkoutCompletionMap>({});
  const [isEveryWorkoutComplete, setIsEveryWorkoutComplete] = useState(false);

  // --- Helper: check if stored map is valid ---
  const isValidMap = useCallback(
    (map: WorkoutCompletionMap) => {
      if (!workouts?.length) return false;
      const allIdsPresent = workouts.every(({ id }) => id in map);
      return allIdsPresent && Object.keys(map).length === workouts.length;
    },
    [workouts],
  );

  // --- Initialize from localStorage or create a new one ---
  useEffect(() => {
    if (!workouts) return;

    const stored = localStorage.getItem('workoutCompletionMap');

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as WorkoutCompletionMap;
        if (isValidMap(parsed)) {
          setWorkoutProgressMap(parsed);
          setIsEveryWorkoutComplete(Object.values(parsed).every(Boolean));
          return;
        }
      } catch {
        console.warn(
          '⚠️ Invalid localStorage workoutCompletionMap, resetting...',
        );
      }
    }

    // If nothing valid, initialize fresh
    const initialMap: WorkoutCompletionMap = Object.fromEntries(
      workouts.map(({ id }) => [id, false]),
    );

    localStorage.setItem('workoutCompletionMap', JSON.stringify(initialMap));
    setWorkoutProgressMap(initialMap);
    setIsEveryWorkoutComplete(false);
  }, [workouts, isValidMap]);

  // --- Update a workout’s completion ---
  const updateWorkoutProgress = useCallback(
    (workoutId: string, isComplete: boolean) => {
      setWorkoutProgressMap((prev) => {
        const updated = { ...prev, [workoutId]: isComplete };
        localStorage.setItem('workoutCompletionMap', JSON.stringify(updated));
        setIsEveryWorkoutComplete(Object.values(updated).every(Boolean));
        return updated;
      });
    },
    [],
  );

  // --- Reset progress (used when completing a session) ---
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
