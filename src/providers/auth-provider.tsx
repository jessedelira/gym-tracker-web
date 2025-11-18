import { type ReactNode, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth-context';
import type { User } from '../types/user';
import axios from 'axios';

export type VerifySessionResponseDto = {
  authenticated: boolean;
  user: User | null;
};

function isValidUnprotectedRoute(route: string): boolean {
  return ['/about', '', '/login', '/signup'].includes(route);
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  async function fetchSession() {
    try {
      const { data } = await axios.get<VerifySessionResponseDto>(
        `${import.meta.env.VITE_API_URL}/api/auth/session`,
        { withCredentials: true },
      );

      if (data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to verify session:', error);
      setUser(null);
    } finally {
      setIsUserLoading(false);
    }
  }

  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

  useEffect(() => {
    const path = location.pathname?.split('/')[1] || '';
    if (isValidUnprotectedRoute(path)) {
      return;
    }

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
