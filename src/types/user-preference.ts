import type { Preference } from './preference';

export type UserPreference = {
  id: string;
  userId: string;
  preference: Preference;
  enabled: boolean;
};
