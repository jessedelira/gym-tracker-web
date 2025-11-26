import { useQuery } from '@tanstack/react-query';
import api from '../../utils/axios';
import type { Routine } from '../../types/routine';

async function fetchActiveRoutine(): Promise<Routine> {
  const { data } = await api.get<Routine>('/api/routine/active');
  return data;
}

export function useFetchActiveRoutine(enabled: boolean) {
  return useQuery({
    queryKey: ['activeRoutine'],
    queryFn: fetchActiveRoutine,
    enabled,
  });
}
