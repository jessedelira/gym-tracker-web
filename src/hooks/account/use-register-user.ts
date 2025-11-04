import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../auth/use-auth';
import z from 'zod';
import { UserSchema } from '../../contexts/user';

type RegisterUserRequest = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  timezoneId: string;
};

const RegisterUserResponseSchema = z.object({
  success: z.boolean(),
  user: UserSchema.nullable(),
});

export type RegisterUserResponse = z.infer<typeof RegisterUserResponseSchema>;

async function registerUser(
  input: RegisterUserRequest,
): Promise<RegisterUserResponse> {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      input,
      { withCredentials: true },
    );

    console.log(data);

    // ✅ Validate the API response with Zod
    return RegisterUserResponseSchema.parse(data);
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useRegisterUser(
  options?: UseMutationOptions<
    RegisterUserResponse,
    Error,
    RegisterUserRequest
  >,
) {
  const { setUser } = useAuth();

  return useMutation<RegisterUserResponse, Error, RegisterUserRequest>({
    mutationFn: registerUser,
    onSuccess: (data, variables, context) => {
      setUser(data.user);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}
