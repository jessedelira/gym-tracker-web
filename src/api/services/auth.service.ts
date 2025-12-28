import { User } from '../../types/user';
import { api } from '../api';

type LoginDto = {
  username: string;
  password: string;
};

export type LoginResponseDto = {
  success: boolean;
  user: User | null;
};

export async function login(loginDto: LoginDto) {
  const { data } = await api.post<LoginResponseDto>('/auth/login', loginDto);

  return data;
}
