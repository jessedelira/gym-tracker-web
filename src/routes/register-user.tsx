import { createResource, createSignal, For, Show } from 'solid-js';
import { AccountCreatedModal } from '../components/modal/account-created-modal';
import { A, useNavigate } from '@solidjs/router';
import { fetchAllTimezones } from '../api/services/timezone.service';
import { createStore } from 'solid-js/store';
import { PeekPasswordInput } from '../components/peek-password-input';
import { login, registerUser } from '../api/services/auth.service';
import { useAuth } from '../contexts/auth-context';
import { delay } from '../utils/delay';

export type RegisterUserFormState = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  timezoneId: string;
};

export function RegisterUserPage() {
  const [timezones] = createResource(fetchAllTimezones);
  const [showModal, setShowModal] = createSignal(false);
  const [registerUserForm, setRegisterUserForm] =
    createStore<RegisterUserFormState>({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      timezoneId: '',
    });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    await registerUser(registerUserForm);
    setShowModal(true);

    await delay(2500);
    const data = await login({
      username: registerUserForm.firstName,
      password: registerUserForm.password
    });

    if (data.success && data.user) {
      setUser(data.user);
      navigate('/home');
    }
  }

  return (
    <>
      <Show
        when={showModal()}
        fallback={
          <main class="min-h-screen bg-gray-50 px-4">
            <div class="mx-auto flex min-h-screen max-w-md flex-col justify-center py-16">
              <div class="mb-8 text-center">
                <h1 class="text-3xl font-semibold tracking-tight text-gray-900">
                  Create Account
                </h1>
                <p class="mt-3 text-gray-600">
                  Start your fitness journey today
                </p>
              </div>

              <form class="space-y-6" onSubmit={handleSubmit}>
                <div class="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
                  {/* Account Details Section */}
                  <div class="space-y-4">
                    <input
                      type="text"
                      onInput={(e) => {
                        setRegisterUserForm((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }));
                      }}
                      placeholder="Username"
                      id="username"
                      class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      required
                    />
                    <PeekPasswordInput
                      id="password"
                      placeholder="Password"
                      minLength={8}
                      isRequired={true}
                      setPassword={setRegisterUserForm}
                    />
                  </div>

                  {/* Personal Details Section */}
                  <div class="space-y-4">
                    <div class="flex gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        id="firstName"
                        onInput={(e) => {
                          setRegisterUserForm((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }));
                        }}
                        class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      />
                      <input
                        type="text"
                        onInput={(e) =>
                          setRegisterUserForm((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        placeholder="Last Name"
                        id="lastName"
                        class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                      />
                    </div>
                    <select
                      id="timezone"
                      required
                      onInput={(e) => {
                        setRegisterUserForm((prev) => ({
                          ...prev,
                          timezoneId: e.target.value,
                        }));
                      }}
                      class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    >
                      <option value="">Select a timezone...</option>

                      <For each={timezones()} fallback={<div>...loading</div>}>
                        {(timezone) => (
                          <option value={timezone.id}>
                            {timezone.display} ({timezone.iana})
                          </option>
                        )}
                      </For>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div class="space-y-4">
                  <button
                    class="w-full rounded-2xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    type="submit"
                  >
                    Create Account
                  </button>
                  <A
                    href="/"
                    class="block w-full rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-center text-base font-medium text-gray-700 shadow-sm transition-all"
                  >
                    Back to Home
                  </A>
                </div>
              </form>
            </div>
          </main>
        }
      >
        <AccountCreatedModal />
      </Show>
    </>
  );
}
