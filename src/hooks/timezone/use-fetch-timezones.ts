import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export type FetchTimezonesResponseDto = {
  id: string;
  iana: string;
  display: string;
}[];

async function fetchTimezones(): Promise<FetchTimezonesResponseDto> {
  try {
    const { data } = await axios.get<FetchTimezonesResponseDto>(
      `${import.meta.env.VITE_API_URL}/api/timezone`,
    );
    return data;
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useFetchTimezones() {
  return useQuery({
    queryKey: ['timezones'],
    queryFn: fetchTimezones,
  });
}
