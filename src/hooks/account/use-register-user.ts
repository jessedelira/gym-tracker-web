import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../auth/use-auth';
import type { User } from '../../types/user';

type RegisterUserRequest = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  timezoneId: string;
};

export type RegisterUserResponse = {
  success: boolean;
  user: User | null;
};

async function registerUser(
  input: RegisterUserRequest,
): Promise<RegisterUserResponse> {
  try {
    const { data } = await axios.post<RegisterUserResponse>(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      input,
      { withCredentials: true },
    );

    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useRegisterUser() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
}
