import { useMutation } from '@tanstack/react-query';
import api from '../../utils/axios';
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
  const { data } = await api.post<RegisterUserResponse>(
    '/api/auth/register',
    input,
  );
  return data;
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
