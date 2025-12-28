import { createMemo, createResource, For, Match, Show, Switch } from 'solid-js';
import {
  fetchActiveRoutine,
  fetchRoutineCount,
} from '../api/services/routine.service';
import { fetchActiveSession } from '../api/services/active-session.service';
import { fetchWorkoutsForActiveSession } from '../api/services/workout.service';
import {
  fetchSessionsForCurrentDay,
  startSession,
} from '../api/services/session.service';
import { fetchCompletedSessionIdsForCurrentDay } from '../api/services/completed-session.service';
import { WelcomeNewUserView } from '../components/welcome-new-user-view';
import { NoActiveRoutineView } from '../components/no-active-routine-view';
import { WorkoutSessionCard } from '../components/workout-session-card';
import { ActiveSessionElapsedTimer } from '../components/active-session-elapsed-timer';
import { LoadingSpinner } from '../components/loading-spinner';

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

  const [workoutsForActiveSession] = createResource(
    activeSessionValue,
    fetchWorkoutsForActiveSession,
  );

  const enableFetchSessionsForCurrentDayAndCompletedSessionIds = createMemo(
    () => !activeSession() && !!activeRoutine(),
  );

  const [sessionsForCurrentDay] = createResource(
    enableFetchSessionsForCurrentDayAndCompletedSessionIds,
    fetchSessionsForCurrentDay,
  );

  const [completedSessionIds] = createResource(
    enableFetchSessionsForCurrentDayAndCompletedSessionIds,
    fetchCompletedSessionIdsForCurrentDay,
  );

  // Combined memos for type-safe conditional rendering

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
    const count = routineCount();
    return count && count.count === 0;
  });

  const hasNoActiveRoutine = createMemo(() => {
    return !activeRoutine() && !isNewUser();
  });

  const availableSessionsData = createMemo(() => {
    const routine = activeRoutine();
    const sessions = sessionsForCurrentDay();
    const completed = completedSessionIds();

    if (routine && sessions && !activeSession()) {
      return {
        routine,
        sessions,
        completedIds: completed?.map((s) => s.id) ?? [],
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

  // Actions
  async function handleStartSessionClick(sessionId: string) {
    await startSession(sessionId);
    await refetchActiveSession();
  }

  return (
    <div class="flex h-fit flex-col items-center">
      <div class="flex h-fit flex-col items-center">
        <Switch>
          <Match when={true}>
            <LoadingSpinner />
          </Match>
          <Match when={isNewUser()}>
            <WelcomeNewUserView />
          </Match>
          <Match when={hasNoActiveRoutine()}>
            <NoActiveRoutineView />
          </Match>
          <Match when={availableSessionsData()}>
            {(data) => (
              <div class="flex min-h-screen w-full flex-col items-center bg-gray-50">
                <For each={data().sessions}>
                  {(session) => (
                    <WorkoutSessionCard
                      session={session}
                      listOfCompletedSessionIds={data().completedIds}
                      onStartSession={() => handleStartSessionClick(session.id)}
                    />
                  )}
                </For>
              </div>
            )}
          </Match>
          <Match when={activeSessionData()}>
            {(data) => (
              <ActiveSessionElapsedTimer
                startedAtDate={new Date(data().session.startedAt)}
              />
            )}
          </Match>
        </Switch>
      </div>
    </div>
  );
}
