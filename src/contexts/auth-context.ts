import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { User } from '../types/user';

type AuthContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isUserLoading: boolean | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
