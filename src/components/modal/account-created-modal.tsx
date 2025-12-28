import { A } from '@solidjs/router';

export function AccountCreatedModal() {
  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Dark Backdrop */}
      <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal Content */}
      <div class="relative z-50 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div class="mb-6 inline-flex rounded-full bg-green-100 p-3">
          <svg
            class="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
          Account Created!
        </h2>

        <p class="mb-6 text-gray-600">
          Your account has been created successfully. You will be signed in
          automatically.
        </p>

        <A
          href="/signin"
          class="block w-full rounded-xl bg-blue-600 px-8 py-4 text-center text-base font-medium text-white shadow-md transition-all"
        >
          Sign In
        </A>
      </div>
    </div>
  );
}
