import { z } from 'zod';
import { Preference } from '../types/preference';

// Reusable nested schemas
export const UserPreferenceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  preference: z.nativeEnum(Preference),
  enabled: z.boolean(),
});

export const UserSettingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  timezoneId: z.string(),
});

// The full user schema
export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateCreated: z.string(),
  hasSeenLatestChangelog: z.boolean(),
  userPreferences: z.array(UserPreferenceSchema),
  userSetting: UserSettingSchema.nullable(),
});

// Derive a TypeScript type from the Zod schema (best practice)
export type User = z.infer<typeof UserSchema>;
