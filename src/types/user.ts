import { Preference } from './preference';

export type UserPreference = {
  id: string;
  userId: string;
  preference: Preference;
  enabled: boolean;
};

export type UserSetting = {
  id: string;
  userId: string;
  timezoneId: string;
};

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateCreated: string;
  hasSeenLatestChangelog: boolean;
  userPreferences: UserPreference[];
  userSetting: UserSetting | null;
};
