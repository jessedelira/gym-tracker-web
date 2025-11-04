import { useMutation } from '@tanstack/react-query';
import { useAuth } from './use-auth';
import axios from 'axios';
import z from 'zod';
import { UserSchema } from '../../contexts/user';

interface LoginProps {
  username: string;
  password: string;
}

const LoginResponseDtoSchema = z.object({
  success: z.boolean(),
  user: UserSchema.nullable(),
});

export type LoginResponseDto = z.infer<typeof LoginResponseDtoSchema>;

async function loginUser(input: LoginProps): Promise<LoginResponseDto> {
  try {
    const { data } = await axios.post<LoginResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      input,
      { withCredentials: true },
    );
    return LoginResponseDtoSchema.parse(data);
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
