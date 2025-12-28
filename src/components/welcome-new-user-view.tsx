import { A } from '@solidjs/router';

export function WelcomeNewUserView() {
  return (
    <div class="mt-15 flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <div class="mb-6 inline-flex rounded-full bg-blue-100 p-4">
        <svg
          class="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-lineca="round"
            stroke-linejoin="round"
            stroke-width={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
        Welcome to Gym Tracker!
      </h2>

      <p class="mb-8 text-gray-600">
        Let&apos;s get started by creating your first workout routine
      </p>

      <A
        href="/training/routines"
        class="w-full rounded-xl bg-blue-600 px-8 py-4 text-center text-base font-medium text-white shadow-md transition-all"
      >
        Create Routine
      </A>
    </div>
  );
}
