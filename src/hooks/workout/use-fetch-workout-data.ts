// components/workout/WorkoutSessionDisplay/hooks/useWorkoutData.ts
import { useMemo } from 'react';
import { api } from '~/utils/api';
import { isConfettiEnabled, showConfetti } from '~/utils/confetti';
import { useWorkoutProgress } from '~/hooks/useWorkoutProgress';

export function useWorkoutData(user) {
  const currentDate = useMemo(() => new Date(), []);
  const userHasConfettiPreferenceEnabled = isConfettiEnabled(user);

  // Core queries (keep dependent ones inside useQuery options)
  const { data: routineCount, isLoading: isRoutineCountLoading } =
    api.routine.getRoutineCountByUserId.useQuery();

  const { data: activeRoutine, isLoading: isActiveRoutineLoading } =
    api.routine.getActiveRoutine.useQuery(undefined, {
      enabled: !isRoutineCountLoading,
    });

  const { data: activeSession, refetch: refetchActiveSession } =
    api.activeSesssion.getActiveSession.useQuery(
      { userId: user.id },
      { enabled: !!activeRoutine },
    );

  const { data: workoutsForActiveSession, refetch: refetchWorkouts } =
    api.workout.getWorkoutsForActiveSession.useQuery(
      {
        userId: user.id,
        sessionId: activeSession?.session.id ?? '',
      },
      { enabled: !!activeSession?.session.id },
    );

  const {
    workoutProgressMap,
    isEveryWorkoutComplete,
    updateWorkoutProgress,
    resetWorkoutProgress,
  } = useWorkoutProgress(workoutsForActiveSession);

  // Mutations
  const { mutateAsync: startSession } =
    api.activeSesssion.addActiveSession.useMutation();
  const { mutateAsync: completeSession } =
    api.completedSession.createCompletedSession.useMutation();

  const refetchAll = () =>
    Promise.all([refetchActiveSession(), refetchWorkouts()]);

  // Handlers
  const handleStartSessionClick = async (sessionId: string) => {
    await startSession({ userId: user.id, sessionId });
    await refetchActiveSession();
  };

  const handleCompleteSessionClick = async () => {
    if (!activeSession) return;
    resetWorkoutProgress();

    if (userHasConfettiPreferenceEnabled) void showConfetti();

    await completeSession({
      userId: user.id,
      sessionId: activeSession.session.id,
    });

    void refetchAll();
  };

  // Derive state
  if (isRoutineCountLoading || isActiveRoutineLoading)
    return { state: 'loading' };

  if (routineCount === 0) return { state: 'noRoutine' };

  if (!activeRoutine) return { state: 'noActiveRoutine' };

  if (activeSession && workoutsForActiveSession)
    return {
      state: 'activeSession',
      workoutsForActiveSession,
      workoutProgress: {
        map: workoutProgressMap,
        isComplete: isEveryWorkoutComplete,
      },
      actions: {
        handleCompleteSessionClick,
        handleStartSessionClick,
        updateWorkoutProgress,
      },
      meta: { activeSession, activeRoutine },
    };

  // Could be expanded later (sessions available, etc.)
  return { state: 'noSessions', meta: { activeRoutine } };
}
