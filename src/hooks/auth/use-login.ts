import { useMutation } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import api from '../../utils/axios';
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
  const { data } = await api.post<LoginResponseDto>('/api/auth/login', input);
  return data;
}

export function useLogin() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => setUser(data.user),
  });
}
