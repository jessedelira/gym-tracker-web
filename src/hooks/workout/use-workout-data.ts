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
import type { ActiveSession } from '../../types/active-session';
import type { User } from '../../types/user';
import type { Routine } from '../../types/routine';
import type { Workout } from '../../types/workout';

// --- Types ---
export type AvailableSession = {
  id: string;
  name: string;
  description: string | null;
};

// --- Discriminated Union for Hook State ---
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
      sessionsForToday: AvailableSession[];
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

// --- Hook Implementation ---
export function useWorkoutData(user: User): WorkoutDataState {
  const hasConfettiPreference = isConfettiEnabled(user);

  // Queries
  const { data: routineCountData, isLoading: isRoutineCountLoading } =
    useFetchRoutineCount();

  const { data: activeRoutine, isLoading: isActiveRoutineLoading } =
    useFetchActiveRoutine(!isRoutineCountLoading);

  const { data: activeSession, refetch: refetchActiveSession } =
    useFetchActiveSession(!!activeRoutine);

  const { data: workoutsForActiveSession } = useFetchWorkoutsForSession(
    activeSession?.session?.id,
  );

  console.log('here', workoutsForActiveSession);

  // 👇 NEW: fetch today's sessions if no active session
  const {
    data: sessionsForToday,
    refetch: refetchWorkouts,
    isLoading: isSessionsForTodayLoading,
  } = useFetchSessionsForToday(!activeSession && !!activeRoutine);

  // Mutations
  const startSession = useStartActiveSession();
  const completeSession = useCompleteSession();

  // Handlers
  const handleStartSessionClick = async (sessionId: string) => {
    await startSession.mutateAsync(sessionId);
    await refetchActiveSession();
  };

  const handleCompleteSessionClick = async () => {
    if (!activeSession) return;

    if (hasConfettiPreference) showConfetti();

    await completeSession.mutateAsync(activeSession.sessionId);
    void Promise.all([refetchActiveSession(), refetchWorkouts()]);
  };

  // Derived UI states
  if (
    isRoutineCountLoading ||
    isActiveRoutineLoading ||
    isSessionsForTodayLoading
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

  // 👇 If there are sessions today but not started yet
  if (sessionsForToday && sessionsForToday.length > 0)
    return {
      state: 'availableSessions',
      sessionsForToday,
      actions: { handleStartSessionClick },
      meta: { activeRoutine },
    };

  // 👇 Otherwise, no sessions for today
  return { state: 'noSessions', meta: { activeRoutine } };
}
