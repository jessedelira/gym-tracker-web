import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export async function fetchCompletedSessionIds(
  userUTCDateTime: Date,
): Promise<string[]> {
  try {
    const { data } = await axios.get<string[]>(
      `${import.meta.env.VITE_API_URL}/api/completed-session/list`,
      {
        withCredentials: true,
        params: { userUTCDateTime: userUTCDateTime.toISOString() },
      },
    );

    console.log('[fetchCompletedSessionIds]', data);
    return data;
  } catch (err) {
    console.error('[fetchCompletedSessionIds] Error', err);
    throw new Error(
      'Unexpected error occurred while fetching completed sessions',
    );
  }
}

export function useFetchCompletedSessionIds(enabled: boolean) {
  return useQuery({
    queryKey: ['completedSessions', 'today'], // TODO: please explain the keys
    queryFn: () => fetchCompletedSessionIds(new Date()),
    enabled,
  });
}
