// src/components/workout/WorkoutViewManager.tsx
import { useState } from 'react';
import type { Session } from '../types/session';
import type { ExerciseType } from '../types/exercise-type';
import LoadingSpinner from './loading-spinner';
import { NoActiveRoutineView } from './view/no-active-routine-view';
import { WelcomeNewUserView } from './view/welcome-new-user-view';
import { NoSessionsOnCurrentDateView } from './workout/no-sessions-on-current-date-view';
import { WorkoutSessionCard } from './workout/workout-session-card';

interface WorkoutWithExercise {
  id: string;
  userId: string;
  sessionId: string;
  exerciseId: string;
  sets: number | null;
  reps: number | null;
  weightLbs: number | null;
  durationSeconds: number | null;
  exercise: {
    id: string;
    name: string;
    type: ExerciseType;
    description: string | null;
  };
}

const mockData = {
  routineCount: 1,
  activeRoutine: { name: 'Push/Pull Split' },
  sessions: [
    {
      id: '1',
      name: 'Chest Day',
      description: 'Upper body focus',
      userId: '123',
      routineId: null,
      createdAt: new Date(),
    },
  ],
};

export function WorkoutViewManager() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasNoRoutines, setHasNoRoutines] = useState(false);
  const [routineCount] = useState(mockData.routineCount);
  const [activeRoutine] = useState(mockData.activeRoutine);
  const [sessions] = useState<Session[]>(mockData.sessions);

  if (isLoading) return <LoadingSpinner />;
  if (hasNoRoutines) return <WelcomeNewUserView />;
  if (!activeRoutine) return <NoActiveRoutineView />;
  if (!sessions || sessions.length === 0)
    return <NoSessionsOnCurrentDateView routineName={activeRoutine.name} />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gray-50">
      <div className="w-full max-w-2xl space-y-3 px-4 pt-4">
        {sessions.map((session) => (
          <WorkoutSessionCard
            key={session.id}
            session={session}
            onStartSession={() =>
              console.info(`🧠 Starting session: ${session.id}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
