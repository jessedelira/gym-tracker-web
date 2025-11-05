import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ActiveSession } from '../../types/active-session';

async function fetchActiveSession(): Promise<ActiveSession> {
  try {
    const { data } = await axios.get<ActiveSession>(
      `${import.meta.env.VITE_API_URL}/api/active-session`,
      { withCredentials: true },
    );
    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

async function startActiveSession(sessionId: string): Promise<void> {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/active-session`,
      { sessionId },
      { withCredentials: true },
    );
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useFetchActiveSession(enabled: boolean) {
  return useQuery({
    queryKey: ['activeSession'],
    queryFn: fetchActiveSession,
    enabled,
  });
}

export function useStartActiveSession() {
  return useMutation({
    mutationFn: startActiveSession,
  });
}
