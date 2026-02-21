import { A } from '@solidjs/router';
import { Icon } from 'solid-heroicons';
import { faceSmile } from 'solid-heroicons/outline';

export function WelcomeNewUserView() {
  return (
    <div class="mt-15 flex h-full w-full flex-col items-center justify-center px-6 text-center">
      <div class="mb-6 inline-flex rounded-full bg-blue-100 p-2">
        <Icon path={faceSmile} class="size-12 text-blue-800" />
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
