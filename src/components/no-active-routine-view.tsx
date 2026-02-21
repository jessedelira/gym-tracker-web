import { A } from '@solidjs/router';

export function NoActiveRoutineView() {
  return (
    <div class="mt-12 flex h-full flex-col items-center justify-center px-6 text-center">
      <h1 class="mb-4 text-xl font-medium text-gray-900">
        No Active Routine Selected
      </h1>
      <p class="mb-8 text-gray-600">
        You have routines created, but none are currently active. Select one to
        get started with your workouts.
      </p>
      <A
        href="/manage/routines"
        class="rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all"
      >
        Select Active Routine
      </A>
    </div>
  );
}
