// src/components/workout/WorkoutViewManager.tsx
import { useWorkoutData } from '../hooks/workout/use-workout-data';
import LoadingSpinner from './loading-spinner';
import { NoActiveRoutineView } from './view/no-active-routine-view';
import { WelcomeNewUserView } from './view/welcome-new-user-view';
import { NoSessionsOnCurrentDateView } from './workout/no-sessions-on-current-date-view';
import { WorkoutSessionCard } from './workout/workout-session-card';

interface WorkoutViewManagerProps {
  user: {
    userPreferences: { preference: string; enabled: boolean }[];
  };
}

export function WorkoutViewManager({ user }: WorkoutViewManagerProps) {
  const workoutData = useWorkoutData(user);

  // --- Loading ---
  if (workoutData.state === 'loading') {
    return <LoadingSpinner />;
  }

  // --- No Routines ---
  if (workoutData.state === 'noRoutine') {
    return <WelcomeNewUserView />;
  }

  // --- No Active Routine ---
  if (workoutData.state === 'noActiveRoutine') {
    return <NoActiveRoutineView />;
  }

  // --- No Sessions Today ---
  if (workoutData.state === 'noSessions') {
    return (
      <NoSessionsOnCurrentDateView
        routineName={workoutData.meta.activeRoutine.name}
      />
    );
  }

  // --- Available Sessions Today (not yet started) ---
  if (workoutData.state === 'availableSessions') {
    const { sessionsForToday, actions } = workoutData;

    return (
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-50">
        <div className="w-full max-w-2xl space-y-3 px-4 pt-4">
          {sessionsForToday.map((session) => (
            <WorkoutSessionCard
              key={session.id}
              session={session}
              onStartSession={() =>
                void actions.handleStartSessionClick(session.id)
              }
            />
          ))}
        </div>
      </div>
    );
  }

  // --- Active Session (currently in progress) ---
  if (workoutData.state === 'activeSession') {
    const { workoutsForActiveSession, actions, meta } = workoutData;

    return (
      <div className="flex min-h-screen w-full flex-col items-center bg-gray-50">
        <div className="w-full max-w-2xl space-y-3 px-4 pt-4">
          {/* Optional: header showing session name */}
          <h2 className="text-xl font-semibold text-gray-800">
            {meta.activeSession.session?.name ?? 'Active Session'}
          </h2>

          {workoutsForActiveSession.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No workouts found for this session.
            </div>
          ) : (
            workoutsForActiveSession.map((workout) => (
              <WorkoutSessionCard
                key={workout.id}
                session={workout}
                onStartSession={() => void actions.handleCompleteSessionClick()}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}
