import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Routine } from '../../types/routine';

async function fetchEnrichedRoutineById(routineId: string): Promise<Routine> {
  const { data } = await axios.get<Routine>(
    `${import.meta.env.VITE_API_URL}/api/routine/${routineId}`,
    { withCredentials: true },
  );

  return data;
}

export function useFetchEnrichedRoutineById(routineId: string) {
  return useQuery({
    queryKey: ['routineById'],
    queryFn: () => fetchEnrichedRoutineById(routineId),
  });
}
