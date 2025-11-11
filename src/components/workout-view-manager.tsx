import { useWorkoutData } from '../hooks/workout/use-workout-data';
import type { User } from '../types/user';
import LoadingSpinner from './loading-spinner';
import { NoActiveRoutineView } from './view/no-active-routine-view';
import { WelcomeNewUserView } from './view/welcome-new-user-view';
import { NoSessionsOnCurrentDateView } from './workout/no-sessions-on-current-date-view';
import { WorkoutSessionCard } from './workout/workout-session-card';
import { ActiveSessionWorkoutList } from './workout/active-session-workout-list';
import { useWorkoutProgress } from '../hooks/workout-progress/use-workout-progress-map';

interface WorkoutViewManagerProps {
  user: User;
}

export function WorkoutViewManager({ user }: WorkoutViewManagerProps) {
  const workoutData = useWorkoutData(user);

  // ✅ Call useWorkoutProgress ALWAYS (safe default: undefined)
  const {
    workoutProgressMap,
    isEveryWorkoutComplete,
    updateWorkoutProgress,
    resetWorkoutProgress,
  } = useWorkoutProgress(
    workoutData.state === 'activeSession'
      ? workoutData.workoutsForActiveSession
      : undefined,
  );

  // --- Loading ---
  if (workoutData.state === 'loading') return <LoadingSpinner />;

  // --- No Routines ---
  if (workoutData.state === 'noRoutine') return <WelcomeNewUserView />;

  // --- No Active Routine ---
  if (workoutData.state === 'noActiveRoutine') return <NoActiveRoutineView />;

  // --- No Sessions Today ---
  if (workoutData.state === 'noSessions')
    return (
      <NoSessionsOnCurrentDateView
        routineName={workoutData.meta.activeRoutine.name}
      />
    );

  // --- Available Sessions (not started) ---
  if (workoutData.state === 'availableSessions') {
    const { sessionsForToday, actions, completedSessionIds } = workoutData;

    return (
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-50">
        <div className="w-full max-w-2xl space-y-3 px-4 pt-4">
          {sessionsForToday.map((session) => {
            return (
              <WorkoutSessionCard
                key={session.id}
                session={session}
                listOfCompletedSessionIds={completedSessionIds}
                onStartSession={() =>
                  void actions.handleStartSessionClick(session.id)
                }
              />
            );
          })}
        </div>
      </div>
    );
  }

  // --- Active Session (in progress) ---
  if (workoutData.state === 'activeSession') {
    const { workoutsForActiveSession, actions, meta } = workoutData;

    return (
      <ActiveSessionWorkoutList
        activeSession={meta.activeSession}
        workoutsForActiveSession={workoutsForActiveSession}
        handleCheckboxChange={(e) =>
          updateWorkoutProgress(e.target.id, e.target.checked)
        }
        handleCompleteSessionClick={async () => {
          await actions.handleCompleteSessionClick();
          resetWorkoutProgress();
        }}
        isEveryWorkoutComplete={isEveryWorkoutComplete}
        workoutProgressMap={workoutProgressMap}
      />
    );
  }

  return null;
}
