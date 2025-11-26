import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';
import api from '../../utils/axios';

async function logoutUser(): Promise<void> {
  await api.post('/api/auth/logout');
}

export function useLogout() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setUser(null);
      navigate('/');
    },
  });
}
