export function AccountCreatedModal() {
  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Dark Backdrop */}
      <div class="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal Content */}
      <div class="relative z-50 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
          Account Created!
        </h2>

        <p class="mb-6 text-gray-600">
          Your account has been created successfully. You will be signed in
          automatically.
        </p>
      </div>
    </div>
  );
}
