import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

// 🧱 Zod schema for the routine (nullable allowed)
export const ActiveRoutineSchema = z
  .object({
    id: z.string(),
    createdAt: z.string(),
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
    userId: z.string(),
  })
  .nullable();

export type ActiveRoutine = z.infer<typeof ActiveRoutineSchema>;

async function fetchActiveRoutine(): Promise<ActiveRoutine> {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/routine/active`,
      { withCredentials: true },
    );

    return ActiveRoutineSchema.parse(data);
  } catch {
    throw new Error('Unexpected error occurred');
  }
}

export function useFetchActiveRoutine(enabled: boolean) {
  return useQuery({
    queryKey: ['activeRoutine'],
    queryFn: fetchActiveRoutine,
    enabled,
  });
}
