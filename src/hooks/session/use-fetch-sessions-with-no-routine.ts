import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Session } from '../../types/session';

async function fetchSessionsWithNoRoutine() {
  const { data } = await axios.get<Session[]>(
    `${import.meta.env.VITE_API_URL}/api/session/not-in-routine`,
    { withCredentials: true },
  );

  return data;
}

export function useFetchSessionsWithNoRoutine() {
  return useQuery({
    queryKey: ['sessionsWithNoRoutine'],
    queryFn: fetchSessionsWithNoRoutine,
  });
}
