import { createContext, useContext, createSignal, onMount } from 'solid-js';
import type { Accessor, ParentProps, Setter } from 'solid-js';
import axios from 'axios';
import type { User } from '../types/user';

type VerifySessionResponseDto = {
  authenticated: boolean;
  user: User;
};

export type AuthContextType = {
  user: Accessor<User | undefined>;
  setUser: Setter<User | undefined>;
  isUserLoading: Accessor<boolean>;
};

const AuthContext = createContext<AuthContextType>();

export function AuthProvider(props: ParentProps) {
  const [user, setUser] = createSignal<User>();
  const [isUserLoading, setIsUserLoading] = createSignal(true);

  async function fetchSession() {
    try {
      const { data } = await axios.get<VerifySessionResponseDto>(
        `${import.meta.env.VITE_API_URL}/api/auth/session`,
        { withCredentials: true },
      );

      if (data && data.authenticated) {
        setUser(data.user);
      }
    } finally {
      setIsUserLoading(false);
    }
  }

  onMount(() => {
    void fetchSession();
  });

  return (
    <AuthContext.Provider value={{ user, setUser, isUserLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
