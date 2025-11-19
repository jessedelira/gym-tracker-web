import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/auth/use-login';
import { PeekPasswordInput } from '../components/peek-password-input';
import { useAuth } from '../hooks/auth/use-auth';
import LoadingSpinner from '../components/loading/loading-spinner';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();
  const { user, isUserLoading } = useAuth();

  useEffect(() => {
    if (user && !isUserLoading) navigate('/home');
  }, [user, isUserLoading, navigate]);

  const handleSignInSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await login({ username, password });
    } catch {
      setShowErrorMessage(true);
    }
  };

  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
  };

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center py-16">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-3 text-gray-600">
            Sign in to continue your fitness journey
          </p>
        </div>

        {/* Form Card */}
        <form
          className="space-y-6"
          onSubmit={(e) => void handleSignInSubmit(e)}
        >
          {/* Error Message */}
          {showErrorMessage && (
            <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-red-700">
              <p className="text-sm font-medium">
                Incorrect username or password
              </p>
              <button
                onClick={handleCloseErrorMessage}
                className="ml-3 flex h-6 w-6 items-center justify-center rounded-full hover:bg-red-100"
                type="button"
              >
                <XMarkIcon className="size-4" />
              </button>
            </div>
          )}
          {/* Input Fields */}
          <div className="space-y-4 rounded-2xl bg-white p-8 shadow-sm">
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
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
          <div className="space-y-4">
            <button
              className="w-full rounded-2xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              type="submit"
            >
              Sign In
            </button>
            <Link
              to="/"
              className="block w-full rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-center text-base font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
