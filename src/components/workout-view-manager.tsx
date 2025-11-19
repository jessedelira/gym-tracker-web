import {
  useWorkoutData,
  WorkoutDataStateType,
} from '../hooks/use-workout-data';
import type { User } from '../types/user';
import LoadingSpinner from './loading/loading-spinner';
import { NoActiveRoutineView } from './view/no-active-routine-view';
import { WelcomeNewUserView } from './view/welcome-new-user-view';
import { NoSessionsOnCurrentDateView } from './workout/no-sessions-on-current-date-view';
import { WorkoutSessionCard } from './workout/workout-session-card';
import { ActiveSessionWorkoutList } from './workout/active-session-workout-list';
import { useLocalStorageWorkoutProgress } from '../hooks/local-storage-active-session-workout-progress/use-local-storage-workout-progress-map';

interface WorkoutViewManagerProps {
  user: User;
}

export function WorkoutViewManager({ user }: WorkoutViewManagerProps) {
  const workoutData = useWorkoutData(user);

  const {
    workoutProgressMap,
    isEveryWorkoutComplete,
    updateWorkoutProgress,
    resetWorkoutProgress,
  } = useLocalStorageWorkoutProgress(
    workoutData.state === WorkoutDataStateType.ACTIVE_SESSION
      ? workoutData.workoutsForActiveSession
      : undefined,
  );

  if (workoutData.state === WorkoutDataStateType.LOADING)
    return <LoadingSpinner />;

  if (workoutData.state === WorkoutDataStateType.NO_ROUTINE)
    return <WelcomeNewUserView />;

  if (workoutData.state === WorkoutDataStateType.NO_ACTIVE_ROUTINE)
    return <NoActiveRoutineView />;

  if (workoutData.state === WorkoutDataStateType.NO_SESSIONS)
    return (
      <NoSessionsOnCurrentDateView
        routineName={workoutData.meta.activeRoutine.name}
      />
    );

  if (workoutData.state === WorkoutDataStateType.AVAILABLE_SESSIONS) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-50">
        <div className="w-full max-w-2xl space-y-3 px-4 pt-4">
          {workoutData.sessionsForToday.map((session) => {
            return (
              <WorkoutSessionCard
                key={session.id}
                session={session}
                listOfCompletedSessionIds={workoutData.completedSessionIds}
                onStartSession={() =>
                  void workoutData.actions.handleStartSessionClick(session.id)
                }
              />
            );
          })}
        </div>
      </div>
    );
  }

  // --- Active Session (in progress) ---
  if (workoutData.state === WorkoutDataStateType.ACTIVE_SESSION) {
    return (
      <ActiveSessionWorkoutList
        activeSession={workoutData.meta.activeSession}
        workoutsForActiveSession={workoutData.workoutsForActiveSession}
        handleCheckboxChange={(e) =>
          updateWorkoutProgress(e.target.id, e.target.checked)
        }
        handleCompleteSessionClick={async () => {
          await workoutData.actions.handleCompleteSessionClick();
          resetWorkoutProgress();
        }}
        isEveryWorkoutComplete={isEveryWorkoutComplete}
        workoutProgressMap={workoutProgressMap}
      />
    );
  }

  return null;
}
