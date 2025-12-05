import {   useQuery } from '@tanstack/react-query';
import type { Exercise } from '../../types/exercise';
import api from '../../utils/axios';

async function fetchAllExercises(): Promise<Exercise[]> {
  const { data } = await api.get<Exercise[]>(`api/exercise`);
  return data;
}

export function useFetchAllExercises() {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: fetchAllExercises,
  });
}
