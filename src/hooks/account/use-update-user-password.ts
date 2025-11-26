import { useMutation } from '@tanstack/react-query';
import api from '../../utils/axios';

type UpdateUserPasswordProps = {
  currentPassword: string;
  newPassword: string;
};

async function updateUserPassword({
  currentPassword,
  newPassword,
}: UpdateUserPasswordProps): Promise<void> {
  await api.patch('/api/user/password', { currentPassword, newPassword });
}

export function useUpdateUserPassword() {
  return useMutation({
    mutationFn: updateUserPassword,
  });
}
