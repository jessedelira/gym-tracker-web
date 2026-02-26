import { User } from '../../types/user';
import { api } from '../api';

type LoginRequestDto = {
  username: string;
  password: string;
};

type LoginResponseDto = {
  success: boolean;
  user?: User;
  error?: string;
};

type RegisterUserDto = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  timezoneId: string;
};

export async function login(
  loginDto: LoginRequestDto,
): Promise<LoginResponseDto> {
  try {
    const { data } = await api.post<LoginResponseDto>('/auth/login', loginDto);
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed';
    return { success: false, error: message };
  }
}

export async function registerUser(registerUser: RegisterUserDto) {
  await api.post('/auth/register', registerUser);
}
