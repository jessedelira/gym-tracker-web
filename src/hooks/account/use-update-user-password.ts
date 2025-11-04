import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type UpdateUserPasswordProps = {
  currentPassword: string;
  newPassword: string;
}

async function updateUserPassword({
  currentPassword,
  newPassword,
}: UpdateUserPasswordProps): Promise<void> {
  try {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/user/password`,
      { currentPassword, newPassword },
      { withCredentials: true },
    );
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useUpdateUserPassword() {
  return useMutation({
    mutationFn: updateUserPassword,
  });
}
