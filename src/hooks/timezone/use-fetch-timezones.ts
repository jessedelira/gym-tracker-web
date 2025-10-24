import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';

const FetchTimezonesResponseDtoSchema = z
  .object({
    id: z.string(),
    iana: z.string(),
    display: z.string(),
  })
  .array();

export type FetchTimezonesResponseDto = z.infer<
  typeof FetchTimezonesResponseDtoSchema
>;

async function fetchTimezones(): Promise<FetchTimezonesResponseDto> {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/timezone`,
    );
    return FetchTimezonesResponseDtoSchema.parse(data);
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
