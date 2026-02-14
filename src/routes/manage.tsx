import { createResource, Show } from 'solid-js';
import { fetchActiveRoutine } from '../api/services/routine.service';

export function ManagePage() {
  const [activeRoutine] = createResource(fetchActiveRoutine);

  return (
    <div class="flex h-full flex-col space-y-4 bg-gray-50 p-4">
      {/* Header */}
      <div class="mb-2">
        <h1 class="text-2xl font-semibold tracking-tight text-gray-900">
          Manage Your Workouts
        </h1>
        <p class="mt-1 text-gray-600">
          Track and organize your fitness journey
        </p>
      </div>

      {/* Active Routine Status */}
      <div class="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div class="flex items-center space-x-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 text-blue-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
          <div class="flex flex-col">
            <div class="text-sm font-medium text-gray-500">Active Routine</div>
            <div class="text-lg font-semibold text-gray-900">
              <Show
                when={activeRoutine()}
                fallback={'No active routine selected'}
              >
                {(activeRoutine) => <>{activeRoutine().name}</>}
              </Show>
            </div>
          </div>
        </div>
      </div>

      {/* Management Options */}
      <div class="rounded-xl border border-gray-100 bg-white shadow-sm">
        Where manage page links will be
        {/*<ManagePageLink
          href="/manage/routines"
          title="Manage Routines"
          description="Collection of sessions for your week"
        />
        <div class="h-px w-full bg-gray-100" />
        <ManagePageLink
          href="/manage/sessions"
          title="Manage Sessions"
          description="Workouts grouped by day"
        />*/}
      </div>

      {/* Activity Graph */}
      {/* <div class="flex-1 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
					<h2 class="mb-4 text-lg font-semibold text-gray-900">
						Activity Graph
					</h2>
					<ActivityGraph />
				</div> */}
    </div>
  );
}
