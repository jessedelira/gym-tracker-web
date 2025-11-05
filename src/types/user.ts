import type { UserPreference } from './user-preference';
import type { UserSetting } from './user-setting';

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateCreated: string;
  hasSeenLatestChangelog: boolean;
  userPreferences?: UserPreference[];
  userSetting?: UserSetting;
};
