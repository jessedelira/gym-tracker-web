import JSConfetti from 'js-confetti';
import type { User } from '../types/user';

/**
 * Triggers a small confetti burst when called.
 */
export function showConfetti(): void {
  const jsConfetti = new JSConfetti();
  void jsConfetti.addConfetti({
    confettiRadius: 10,
    confettiNumber: 20,
    emojis: ['🎉', '🎊'],
    emojiSize: 50,
  });
}

/**
 * Checks if the user has confetti enabled in their preferences.
 */
export function isConfettiEnabled(user: User): boolean {
  if (!user?.userPreferences) return false;

  return user.userPreferences.some(
    (pref) =>
      pref.preference === 'CONFETTI_ON_SESSION_COMPLETION' && pref.enabled,
  );
}
