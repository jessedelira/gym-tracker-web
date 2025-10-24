import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth/use-auth';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserPassword } from '../hooks/account/use-update-user-password';

export default function Settings() {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmNewPassword] = useState('');
  const updateUserPassword = useUpdateUserPassword();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateUserPassword.mutateAsync({
      currentPassword,
      newPassword,
    });
    setNewPassword('');
    setConfirmNewPassword('');
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="mt-8 flex flex-grow flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-prose text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Account Settings
          </h1>
          <p className="text-lg text-gray-700">
            Update your account information and password
          </p>
        </div>
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-lg bg-white p-8 shadow-lg"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password (optional)
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {updateUserPassword.error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {updateUserPassword.error.message}
              </div>
            )}

            {updateUserPassword.isSuccess && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                Profile updated successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={updateUserPassword.isPending}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
            >
              {updateUserPassword.isPending ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
