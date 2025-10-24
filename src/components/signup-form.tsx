import { useState } from 'react';
import { useRegisterUser } from '../hooks/account/use-register-user';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const register = useRegisterUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await register.mutateAsync({ username, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          minLength={4}
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-200 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          minLength={8}
          required
        />
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <button
        type="submit"
        disabled={register.isPending}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
      >
        {register.isPending ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
}
