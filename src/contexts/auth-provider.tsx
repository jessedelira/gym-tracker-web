import { type ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './auth-context';
import { UserSchema, type User } from './user';
import axios from 'axios';
import { z } from 'zod';

const VerifySessionResponseDtoSchema = z.object({
  authenticated: z.boolean(),
  user: UserSchema.nullable(),
});

export type VerifySessionResponseDto = z.infer<
  typeof VerifySessionResponseDtoSchema
>;

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axios.get<VerifySessionResponseDto>(
          `${import.meta.env.VITE_API_URL}/api/auth/session`,
          { withCredentials: true },
        );

        const parsed = VerifySessionResponseDtoSchema.parse(data);
        if (parsed.authenticated) {
          setUser(parsed.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to verify session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
