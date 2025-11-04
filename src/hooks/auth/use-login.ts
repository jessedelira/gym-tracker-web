import { useMutation } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import axios from 'axios';
import type { User } from '../../types/user';

type LoginProps = {
  username: string;
  password: string;
};

export type LoginResponseDto = {
  success: boolean;
  user: User | null;
};

async function loginUser(input: LoginProps): Promise<LoginResponseDto> {
  try {
    const { data } = await axios.post<LoginResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      input,
      { withCredentials: true },
    );
    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useLogin() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => setUser(data.user),
  });
}
