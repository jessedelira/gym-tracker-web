import JSConfetti from 'js-confetti';
import { User } from '../types/user';
import { Preference } from '../types/preference';

export const showConfetti = () => {
  const jsConfetti = new JSConfetti();
  return jsConfetti.addConfetti({
    confettiRadius: 10,
    confettiNumber: 20,
    emojis: ['🎉', '🎊'],
    emojiSize: 50,
  });
};

export const isConfettiEnabled = (user: User) => {
  return user?.userPreferences.some(
    (preference) =>
      preference.preference === Preference.CONFETTI_ON_SESSION_COMPLETION &&
      preference.enabled === true,
  );
};
