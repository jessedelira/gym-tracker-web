import { A } from '@solidjs/router';
import { useAuth } from '../../../contexts/auth-context';
import {
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from 'solid-js';
import { fetchAllRoutinesByUserId } from '../../../api/services/routine.service';
import { Routine } from '../../../types/routine';

export function ManageRoutines() {
  const ACTIVE_STAR_CLASSES = 'h-6 w-6 text-yellow-400 fill-current';
  const INACTIVE_STAR_CLASSES =
    'h-6 w-6 text-gray-400 hover:text-yellow-400 transition-colors';

  const { user } = useAuth();
  const [currentActiveRoutine, setCurrentActiveRoutine] =
    createSignal<Routine | null>(null);
  const [allRoutines] = createResource(
    () => user()?.id || undefined,
    fetchAllRoutinesByUserId,
  );

  createEffect(() => {
    const routines = allRoutines();
    if (routines) {
      for (const routine of routines) {
        if (routine.isActive) setCurrentActiveRoutine(routine);
      }
    }
  });

  // create another api call to get all of the routines for the page to be displayed
  // you will create another two api endpoints to setActiveRoutine and removeActiveRoutine

  function onStarClick(outineId: string) {
    if (currentActiveRoutine && currentActiveRoutine.id === routineId) {
      removeActiveRoutineMutation.mutate({
        userId: sessionData?.user.id || '',
      });
      setCurrentActiveRoutine(null);
      return;
    }

    setActiveRoutineMutation.mutate({
      routineId: routineId,
    });
    const clickedRoutine = routineData?.find(
      (routine) => routine.id === routineId,
    );
    if (clickedRoutine) {
      setCurrentActiveRoutine(clickedRoutine);
    }
  }

  return (
    <div class="flex h-full flex-col bg-gray-50 px-4 py-6">
      {/* Header Section */}
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-semibold tracking-tight text-gray-900">
            Manage Routines
          </h1>
          <A
            href="/create/routine"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width={2}
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </A>
        </div>

        {/* Active Routine Status */}
        <div class="mt-4 rounded-xl bg-white p-4 shadow-sm">
          <p class="text-sm font-medium text-gray-500">Active Routine</p>
          <p class="mt-1 text-lg text-gray-900">
            {currentActiveRoutine
              ? currentActiveRoutine.name.length > 30
                ? currentActiveRoutine.name.substring(0, 30) + '...'
                : currentActiveRoutine.name
              : 'No active routine selected'}
          </p>
        </div>
      </div>
      <Show when={currentActiveRoutine()}>
        {(currentActiveRoutine) => <div>{currentActiveRoutine().name}</div>}
      </Show>

      {/* Routines List */}
      <Show
        when={allRoutines()}
        fallback={
          <div class="mt-8 text-center">
            <div class="mb-4 inline-flex rounded-full bg-blue-100 p-4">
              <svg
                class="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2 class="text-gray-600">
              Create your first routine to get started
            </h2>
          </div>
        }
      >
        {(allRoutines) => (
          <div class="space-y-3">
            <For each={allRoutines()}>{(routine) => <>{routine.id}</>}</For>
          </div>
        )}

        {/*<div class="space-y-3">
          {routineData.map((routine) => (
            <div
              key={routine.id}
              class="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-medium text-gray-900">
                    {routine.name}
                  </h3>
                  {routine.description && (
                    <p class="mt-1 text-sm text-gray-600">
                      {routine.description.length > 35
                        ? routine.description.substring(0, 35) + '...'
                        : routine.description}
                    </p>
                  )}
                </div>
                <div class="ml-4 flex items-center gap-3">
                  <button
                    onClick={() => onStarClick(routine.id)}
                    class="rounded-lg p-2 transition-all hover:bg-gray-50"
                    title={
                      currentActiveRoutine &&
                      routine.id === currentActiveRoutine.id
                        ? 'Active Routine'
                        : 'Set as Active Routine'
                    }
                  >
                    {currentActiveRoutine &&
                    routine.id === currentActiveRoutine.id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        class={ACTIVE_STAR_CLASSES}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        class={INACTIVE_STAR_CLASSES}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    )}
                  </button>
                  <Link
                    href={`/edit/routine/${routine.id}`}
                    class="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="h-5 w-5"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>*/}
      </Show>
    </div>
  );
}
