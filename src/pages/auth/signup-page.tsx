import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchTimezones } from '../../hooks/timezone/use-fetch-timezones';

import { useRegisterUser } from '../../hooks/account/use-register-user';
import { useLogin } from '../../hooks/auth/use-login';
import { PeekPasswordInput } from '../../components/peek-password-input';
import { AccountCreatedModal } from '../../components/modal/account-created-modal';
import { useAuth } from '../../hooks/auth/use-auth';

export default function SignUp() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [timezoneId, setTimezoneId] = useState<string>('');

  const navigate = useNavigate();
  const { data: timezones } = useFetchTimezones();
  const login = useLogin();
  const registerUser = useRegisterUser();
  const { user } = useAuth();

  if (user) {
    navigate('/home');
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await registerUser.mutateAsync({
        username,
        password,
        firstName,
        lastName,
        timezoneId,
      });

      if (response.success) {
        setShowModal(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        await login.mutateAsync({ username, password });
        navigate('/home');
      }
    } catch (error) {
      console.error('Registration or login failed:', error);
    }
  };

  return (
    <>
      {showModal && <AccountCreatedModal />}

      <main className="min-h-screen bg-gray-50 px-4">
        <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center py-16">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
              Create Account
            </h1>
            <p className="mt-3 text-gray-600">
              Start your fitness journey today
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => void handleSubmit(e)}>
            <div className="space-y-6 rounded-2xl bg-white p-8 shadow-sm">
              {/* Account Details Section */}
              <div className="space-y-4">
                <input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Username"
                  id="username"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  required
                />
                <PeekPasswordInput
                  id="password"
                  placeholder="Password"
                  setPassword={setPassword}
                />
              </div>

              {/* Personal Details Section */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
                  <input
                    type="text"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    placeholder="Last Name"
                    id="lastName"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all  focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  />
                </div>
                <select
                  id="timezone"
                  required
                  value={timezoneId}
                  onChange={(e) => {
                    setTimezoneId(e.target.value);
                  }}
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                >
                  <option value="">Select a timezone...</option>
                  {timezones?.map((timezone) => (
                    <option key={timezone.id} value={timezone.id}>
                      {timezone.display} ({timezone.iana})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                className="w-full rounded-2xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                type="submit"
              >
                Create Account
              </button>
              <Link
                to="/"
                className="block w-full rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-center text-base font-medium text-gray-700 shadow-sm transition-all"
              >
                Back to Home
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
