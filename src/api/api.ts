import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// Response interceptor to extract error messages from API responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.data) {
      const data = error.response.data as { error: string };
      const message = data.error;
      if (message) {
        return Promise.reject(new Error(message));
      }
    }
    return Promise.reject(error);
  },
);
