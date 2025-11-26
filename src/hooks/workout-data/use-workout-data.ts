import { isConfettiEnabled, showConfetti } from '../utils/confetti';
import { useFetchActiveRoutine } from './active-routine/use-fetch-active-routine';
import {
  useFetchActiveSession,
  useStartActiveSession,
} from './active-session/use-active-session';
import { useCompleteSession } from './completed-session/use-complete-session';
import { useFetchRoutineCount } from './routine/use-fetch-routine-count';
import { useFetchWorkoutsForSession } from './workout/use-fetch-workouts-for-session';
import { useFetchSessionsForToday } from './session/use-fetch-sessions-for-today';
import { useFetchCompletedSessionIds } from './completed-session/use-fetch-completed-session-ids';

import type { ActiveSession } from '../types/active-session';
import type { User } from '../types/user';
import type { Routine } from '../types/routine';
import type { Workout } from '../types/workout';
import type { Session } from '../types/session';

export enum WorkoutDataStateType {
  LOADING = 'Loading',
  NO_ROUTINE = 'No Routine',
  NO_ACTIVE_ROUTINE = 'No Active Routine',
  NO_SESSIONS = 'No Sessions',
  AVAILABLE_SESSIONS = 'Available Sessions',
  ACTIVE_SESSION = 'Active Session',
}

export type WorkoutDataState =
  | {
      state: WorkoutDataStateType.LOADING;
    }
  | {
      state: WorkoutDataStateType.NO_ROUTINE;
    }
  | {
      state: WorkoutDataStateType.NO_ACTIVE_ROUTINE;
    }
  | {
      state: WorkoutDataStateType.NO_SESSIONS;
      meta: {
        activeRoutine: Routine;
        activeSession: null;
      };
    }
  | {
      state: WorkoutDataStateType.AVAILABLE_SESSIONS;
      sessionsForToday: Session[];
      completedSessionIds: string[];
      actions: {
        handleCompleteSessionClick: () => Promise<void>;
        handleStartSessionClick: (sessionId: string) => Promise<void>;
      };
      meta: {
        activeRoutine: Routine;
        activeSession: null;
      };
    }
  | {
      state: WorkoutDataStateType.ACTIVE_SESSION;
      workoutsForActiveSession: Workout[];
      actions: {
        handleCompleteSessionClick: () => Promise<void>;
        handleStartSessionClick: (sessionId: string) => Promise<void>;
      };
      meta: {
        activeRoutine: Routine;
        activeSession: ActiveSession;
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
    useFetchActiveRoutine(
      !isRoutineCountLoading &&
        routineCountData !== undefined &&
        routineCountData.count > 0,
    );

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
  async function handleStartSessionClick(sessionId: string) {
    await startSession.mutateAsync(sessionId);
    await refetchActiveSession();
  }

  async function handleCompleteSessionClick() {
    if (!activeSession) return;

    if (hasConfettiPreference) showConfetti();

    await completeSession.mutateAsync(activeSession.sessionId);

    await refetchActiveSession();
  }

  // --- Derived UI states ---
  if (
    isRoutineCountLoading ||
    isActiveRoutineLoading ||
    isSessionsForTodayLoading ||
    isCompletedLoading
  ) {
    return { state: WorkoutDataStateType.LOADING };
  }

  if (routineCountData?.count === 0)
    return { state: WorkoutDataStateType.NO_ROUTINE };

  if (!activeRoutine) return { state: WorkoutDataStateType.NO_ACTIVE_ROUTINE };

  if (activeSession && workoutsForActiveSession)
    return {
      state: WorkoutDataStateType.ACTIVE_SESSION,
      workoutsForActiveSession,
      actions: { handleCompleteSessionClick, handleStartSessionClick },
      meta: { activeSession, activeRoutine },
    };

  if (sessionsForToday && sessionsForToday.length > 0)
    return {
      state: WorkoutDataStateType.AVAILABLE_SESSIONS,
      sessionsForToday,
      completedSessionIds: completedSessionIds ?? [],
      actions: {
        handleStartSessionClick,
        handleCompleteSessionClick,
      },
      meta: { activeRoutine, activeSession: null },
    };

  return {
    state: WorkoutDataStateType.NO_SESSIONS,
    meta: { activeRoutine, activeSession: null },
  };
}
