import { createMemo, createResource, For, Match, Switch } from 'solid-js';
import { fetchActiveSession } from '../api/services/active-session.service';
import {
  completeActiveSession,
  fetchCompletedSessionIdsForCurrentDay,
} from '../api/services/completed-session.service';
import {
  fetchActiveRoutine,
  fetchRoutineCount,
} from '../api/services/routine.service';
import {
  fetchSessionsForCurrentDay,
  startSession,
} from '../api/services/session.service';
import {
  fetchWorkoutsForActiveSession,
  setWorkoutToCompleteBasedOnValue,
} from '../api/services/workout.service';
import { ActiveSessionWorkoutList } from '../components/active-session-workout-list';
import { LoadingSpinner } from '../components/loading-spinner';
import { NoActiveRoutineView } from '../components/no-active-routine-view';
import { WelcomeNewUserView } from '../components/welcome-new-user-view';
import { WorkoutSessionCard } from '../components/workout-session-card';
import { Workout } from '../types/workout';
import { showConfetti } from '../utils/confetti';

export function Home() {
  // Resources
  const [routineCount] = createResource(fetchRoutineCount);
  const routineCountValue = createMemo(() => routineCount()?.count);
  const [activeRoutine] = createResource(routineCountValue, fetchActiveRoutine);
  const activeRoutineValue = createMemo(() => activeRoutine());

  const [activeSession, { refetch: refetchActiveSession }] = createResource(
    activeRoutineValue,
    fetchActiveSession,
  );
  const activeSessionValue = createMemo(() => activeSession());

  const [workoutsForActiveSession, { mutate: mutateWorkoutsForActiveSession }] =
    createResource(activeSessionValue, fetchWorkoutsForActiveSession);

  const enableFetchSessionsForCurrentDayAndCompletedSessionIds = createMemo(
    () => !activeSession() && !!activeRoutine(),
  );

  const [sessionsForCurrentDay] = createResource(
    enableFetchSessionsForCurrentDayAndCompletedSessionIds,
    fetchSessionsForCurrentDay,
  );

  const [completedSessionIds, { refetch: refetchCompletedSessionIds }] =
    createResource(
      enableFetchSessionsForCurrentDayAndCompletedSessionIds,
      fetchCompletedSessionIdsForCurrentDay,
    );

  // Memo for loading data
  const isLoading = createMemo(
    () =>
      routineCount.loading ||
      activeRoutine.loading ||
      activeSession.loading ||
      workoutsForActiveSession.loading ||
      sessionsForCurrentDay.loading ||
      completedSessionIds.loading,
  );

  const isNewUser = createMemo(() => {
    return routineCount() && routineCount()?.count === 0;
  });

  const hasNoActiveRoutine = createMemo(() => {
    return !activeRoutine() && !isNewUser();
  });

  const noSessionAvailableToday = createMemo(() => {
    if (
      activeRoutine() &&
      !activeSession() &&
      sessionsForCurrentDay()?.length === 0
    ) {
      return true;
    } else {
      return false;
    }
  });

  const availableSessionsData = createMemo(() => {
    if (activeRoutine() && sessionsForCurrentDay() && !activeSession()) {
      return {
        routine: activeRoutine(),
        sessions: sessionsForCurrentDay(),
        completedIds: completedSessionIds(),
      };
    }
    return null;
  });

  const activeSessionData = createMemo(() => {
    const session = activeSession();
    const workouts = workoutsForActiveSession();

    if (session) {
      return {
        session,
        workouts: workouts ?? [],
      };
    }
    return null;
  });

  const isEveryWorkoutComplete = createMemo(() => {
    if (
      workoutsForActiveSession.loading === false &&
      workoutsForActiveSession()
    ) {
      return workoutsForActiveSession()!.every(
        // how to fix the workoutsForActiveSession being possibley undefined?
        (workout) => workout.isCompletedWhileActive === true,
      );
    }
    return false;
  });

  // Handler Functions
  async function handleStartSessionClick(sessionId: string) {
    await startSession(sessionId);
    await refetchActiveSession();
  }

  function handleCheckboxChange(
    event: Event & { currentTarget: HTMLInputElement },
  ) {
    const currentTargetTag = event.currentTarget;
    const workoutId = currentTargetTag.id;
    const isCheckboxChecked = event.currentTarget.checked;

    let workoutsToBeMutated: Workout[];

    if (isCheckboxChecked) {
      setWorkoutToCompleteBasedOnValue(workoutId, isCheckboxChecked);
      workoutsToBeMutated = workoutsForActiveSession()!.map((workout) => {
        if (workout.id === workoutId) {
          workout.isCompletedWhileActive = true;
          return workout;
        } else {
          return workout;
        }
      });
    } else {
      setWorkoutToCompleteBasedOnValue(workoutId, isCheckboxChecked);
      workoutsToBeMutated = workoutsForActiveSession()!.map((workout) => {
        if (workout.id === workoutId) {
          workout.isCompletedWhileActive = false;
          return workout;
        } else {
          return workout;
        }
      });
    }

    mutateWorkoutsForActiveSession(workoutsToBeMutated);
  }

  async function handleCompleteSessionClick() {
    await completeActiveSession(activeSession()?.sessionId ?? '');
    void showConfetti();
    await refetchActiveSession();
    await refetchCompletedSessionIds();
  }

  return (
    <div class="flex h-fit flex-col items-center">
      <Switch>
        <Match when={isLoading()}>
          <LoadingSpinner />
        </Match>
        <Match when={isNewUser()}>
          <WelcomeNewUserView />
        </Match>
        <Match when={hasNoActiveRoutine()}>
          <NoActiveRoutineView />
        </Match>
        {/* Create a Match for when you have no sessions on Day*/}
        <Match when={noSessionAvailableToday()}>
          <div>
            You don't have any sessions today for Routine{' '}
            {activeRoutine()?.name} :)
          </div>
        </Match>
        <Match when={availableSessionsData()}>
          {(data) => (
            <div class="flex min-h-screen w-full flex-col items-center bg-gray-50 pt-8">
              <For each={data().sessions}>
                {(session) => (
                  <WorkoutSessionCard
                    session={session}
                    listOfCompletedSessionIds={data().completedIds ?? []}
                    onStartSession={() => handleStartSessionClick(session.id)}
                  />
                )}
              </For>
            </div>
          )}
        </Match>
        <Match when={activeSessionData()}>
          {(data) => (
            <ActiveSessionWorkoutList
              activeSession={data().session}
              workoutsForActiveSession={data().workouts}
              handleCheckboxChange={handleCheckboxChange}
              handleCompleteSessionClick={handleCompleteSessionClick}
              isEveryWorkoutComplete={isEveryWorkoutComplete()}
            />
          )}
        </Match>
      </Switch>
    </div>
  );
}
