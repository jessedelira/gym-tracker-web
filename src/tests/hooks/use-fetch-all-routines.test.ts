import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFetchAllRoutines } from '../../hooks/routine/use-fetch-all-routines';
import axios from 'axios';
import type { Routine } from '../../types/routine';
import type { ReactNode } from 'react';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

// Create a wrapper with QueryClientProvider for testing hooks
// Using createElement instead of JSX so we can use .ts extension
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Don't retry on failure during tests
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(
      QueryClientProvider,
      { client: queryClient },
      children,
    );
  };
}

const mockRoutines: Routine[] = [
  {
    id: 'routine-1',
    createdAt: '2024-01-01T00:00:00.000Z',
    name: 'Push Day',
    description: 'Chest, shoulders, triceps',
    isActive: true,
    userId: 'user-123',
  },
  {
    id: 'routine-2',
    createdAt: '2024-01-02T00:00:00.000Z',
    name: 'Pull Day',
    description: 'Back, biceps',
    isActive: false,
    userId: 'user-123',
  },
];

describe('useFetchAllRoutines', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not fetch when userId is undefined', () => {
    const { result } = renderHook(() => useFetchAllRoutines(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('should not fetch when userId is empty string', () => {
    const { result } = renderHook(() => useFetchAllRoutines(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isFetching).toBe(false);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('should fetch routines when userId is provided', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockRoutines });

    const { result } = renderHook(() => useFetchAllRoutines('user-123'), {
      wrapper: createWrapper(),
    });

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockRoutines);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/api/routine/list/user-123'),
      { withCredentials: true },
    );
  });

  it('should return error when fetch fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useFetchAllRoutines('user-123'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.error?.message).toBe('Unexpected error occurred');
  });

  it('should include userId in queryKey for cache separation', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockRoutines });

    const { result: result1 } = renderHook(
      () => useFetchAllRoutines('user-123'),
      { wrapper: createWrapper() },
    );

    const { result: result2 } = renderHook(
      () => useFetchAllRoutines('user-456'),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result1.current.isSuccess).toBe(true);
    });

    await waitFor(() => {
      expect(result2.current.isSuccess).toBe(true);
    });

    // Both should have made separate API calls
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });
});
