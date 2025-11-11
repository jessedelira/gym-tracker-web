import { isConfettiEnabled, showConfetti } from '../../utils/confetti';
import { useFetchActiveRoutine } from '../active-routine/use-fetch-active-routine';
import {
  useFetchActiveSession,
  useStartActiveSession,
} from '../active-session/use-active-session';
import { useCompleteSession } from '../completed-session/use-complete-session';
import { useFetchRoutineCount } from '../routine/use-fetch-routine-count';
import { useFetchWorkoutsForSession } from './use-fetch-workouts-for-session';
import { useFetchSessionsForToday } from '../session/use-fetch-sessions-for-today';
import { useFetchCompletedSessionIds } from '../completed-session/use-fetch-completed-session-ids';

import type { ActiveSession } from '../../types/active-session';
import type { User } from '../../types/user';
import type { Routine } from '../../types/routine';
import type { Workout } from '../../types/workout';
import type { Session } from '../../types/session';

/**
 * Discriminated union for all workout-related data states.
 */
type WorkoutDataState =
  | { state: 'loading' }
  | { state: 'noRoutine' }
  | { state: 'noActiveRoutine' }
  | {
      state: 'noSessions';
      meta: { activeRoutine: Routine };
    }
  | {
      state: 'availableSessions';
      sessionsForToday: Session[];
      completedSessionIds: string[];
      actions: {
        handleStartSessionClick: (sessionId: string) => Promise<void>;
      };
      meta: { activeRoutine: Routine };
    }
  | {
      state: 'activeSession';
      workoutsForActiveSession: Workout[];
      actions: {
        handleCompleteSessionClick: () => Promise<void>;
        handleStartSessionClick: (sessionId: string) => Promise<void>;
      };
      meta: {
        activeSession: ActiveSession;
        activeRoutine: Routine;
      };
    };

/**
 * Main hook that orchestrates workout session logic.
 */
export function useWorkoutData(user: User): WorkoutDataState {
  const hasConfettiPreference = isConfettiEnabled(user);

  // --- Queries ---
  const { data: routineCountData, isLoading: isRoutineCountLoading } =
    useFetchRoutineCount();

  const { data: activeRoutine, isLoading: isActiveRoutineLoading } =
    useFetchActiveRoutine(!isRoutineCountLoading);

  const { data: activeSession, refetch: refetchActiveSession } =
    useFetchActiveSession(!!activeRoutine);

  const { data: workoutsForActiveSession } = useFetchWorkoutsForSession(
    activeSession?.session?.id,
  );

  const { data: sessionsForToday, isLoading: isSessionsForTodayLoading } =
    useFetchSessionsForToday(!activeSession && !!activeRoutine);

  const { data: completedSessionIds, isLoading: isCompletedLoading } =
    useFetchCompletedSessionIds(!activeSession && !!activeRoutine);

  // --- Mutations ---
  const startSession = useStartActiveSession();
  const completeSession = useCompleteSession();

  // --- Handlers ---
  const handleStartSessionClick = async (sessionId: string) => {
    await startSession.mutateAsync(sessionId);
    await refetchActiveSession();
  };

  const handleCompleteSessionClick = async () => {
    if (!activeSession) return;

    if (hasConfettiPreference) showConfetti();

    await completeSession.mutateAsync(activeSession.sessionId);
    await refetchActiveSession();
  };

  // --- Derived UI states ---
  if (
    isRoutineCountLoading ||
    isActiveRoutineLoading ||
    isSessionsForTodayLoading ||
    isCompletedLoading
  ) {
    return { state: 'loading' };
  }

  if (routineCountData?.count === 0) return { state: 'noRoutine' };

  if (!activeRoutine) return { state: 'noActiveRoutine' };

  if (activeSession && workoutsForActiveSession)
    return {
      state: 'activeSession',
      workoutsForActiveSession,
      actions: { handleCompleteSessionClick, handleStartSessionClick },
      meta: { activeSession, activeRoutine },
    };

  if (sessionsForToday && sessionsForToday.length > 0)
    return {
      state: 'availableSessions',
      sessionsForToday,
      completedSessionIds: completedSessionIds ?? [],
      actions: { handleStartSessionClick },
      meta: { activeRoutine },
    };

  return { state: 'noSessions', meta: { activeRoutine } };
}
