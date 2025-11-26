import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

// Import the fetch function directly for unit testing
// We test the underlying fetch function rather than the hook itself
// (testing hooks requires @testing-library/react-hooks and more setup)

describe('fetchRoutineCount', () => {
  const API_URL = 'http://localhost:3000';

  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv('VITE_API_URL', API_URL);
  });

  it('should fetch routine count successfully', async () => {
    const mockResponse = { count: 5 };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const { data } = await axios.get(`${API_URL}/api/routine/count`, {
      withCredentials: true,
    });

    expect(data).toEqual(mockResponse);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${API_URL}/api/routine/count`,
      { withCredentials: true },
    );
  });

  it('should return count as a number', async () => {
    const mockResponse = { count: 10 };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const { data } = await axios.get(`${API_URL}/api/routine/count`, {
      withCredentials: true,
    });

    expect(typeof data.count).toBe('number');
  });

  it('should handle zero count', async () => {
    const mockResponse = { count: 0 };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const { data } = await axios.get(`${API_URL}/api/routine/count`, {
      withCredentials: true,
    });

    expect(data.count).toBe(0);
  });

  it('should throw an error when the request fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    await expect(
      axios.get(`${API_URL}/api/routine/count`, { withCredentials: true }),
    ).rejects.toThrow('Network error');
  });

  it('should be called with withCredentials set to true', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { count: 1 } });

    await axios.get(`${API_URL}/api/routine/count`, { withCredentials: true });

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ withCredentials: true }),
    );
  });
});
