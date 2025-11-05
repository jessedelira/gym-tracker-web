import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function completeSession(sessionId: string): Promise<void> {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/completed-session`,
      { sessionId },
      { withCredentials: true },
    );
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useCompleteSession() {
  return useMutation({
    mutationFn: completeSession,
  });
}
