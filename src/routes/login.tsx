import { createSignal, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { Icon } from 'solid-heroicons';
import { xMark } from 'solid-heroicons/outline';
import { PeekPasswordInput } from '../components/peek-password-input';
import { login } from '../api/services/auth.service';

import { useNavigate } from '@solidjs/router';
import { useAuth } from '../contexts/auth-context';
import { createForm } from '@modular-forms/solid';

type LoginForm = {
  username: string,
  password: string
}


export function LoginPage() {
  const [showErrorMessage, setShowErrorMessage] = createSignal(false);
  const [loginForm, { Form, Field, FieldArray }] = createForm<LoginForm>();
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  async function handleSignInSubmit(e: SubmitEvent) {
    e.preventDefault();
    const data = await login({ username: username(), password: password() });

    if (data.success) {
      setUser(data.user);
      navigate('/home');
    } else {
      setShowErrorMessage(true);
    }
  }

  function handleCloseErrorMessage() {
    setShowErrorMessage(false);
  }

  return (
    <main class="min-h-screen bg-gray-50 px-4">
      <div class="mx-auto flex min-h-screen max-w-md flex-col justify-center py-16">
        {/* Header */}
        <div class="mb-8 text-center">
          <h1 class="text-3xl font-semibold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p class="mt-3 text-gray-600">
            Sign in to continue your fitness journey
          </p>
        </div>

        {/* Form */}
        <Form>
          
        </Form>
        {/*
        <form class="space-y-6" onSubmit={handleSignInSubmit}>
        // Error Message HERE
          <Show when={showErrorMessage()}>
            <div class="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-red-700">
              <p class="text-sm font-medium">Incorrect username or password</p>
              <button
                onClick={handleCloseErrorMessage}
                class="ml-3 flex h-6 w-6 items-center justify-center rounded-full"
                type="button"
              >
                <Icon path={xMark} class="size-4" />
              </button>
            </div>
          </Show>
          {/* Input Fields */}
        <div class="space-y-4 rounded-2xl bg-white p-8 shadow-sm">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onInput={(e) => setUsername(e.currentTarget.value)}
            class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            required
          />
          <PeekPasswordInput
            id="password"
            placeholder="Password"
            setPassword={setPassword}
            isRequired
          />
        </div>

        {/* Action Buttons */}
        <div class="space-y-4">
          <button
            class="w-full rounded-2xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            type="submit"
          >
            Sign In
          </button>
          <A
            href="/"
            class="block w-full rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-center text-base font-medium text-gray-700 shadow-sm transition-all"
          >
            Back to Home
          </A>
        </div>
      </form>
        */}
    </div>
    </main >
  );
}
