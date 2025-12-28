import { createEffect, createSignal } from 'solid-js';
import { useAuth } from '../contexts/auth-context';
import { Preference } from '../types/preference';

type CurrentSessionElapsedTimerProps = {
  startedAtDate: Date;
};

export function ActiveSessionElapsedTimer(
  props: CurrentSessionElapsedTimerProps,
) {
  const [elapsedMinutes, setElapsedMinutes] = createSignal('0');
  const [elapsedSeconds, setElapsedSeconds] = createSignal('0');

  const { user } = useAuth();

  createEffect(() => {
    if (!props.startedAtDate) return;

    const updateElapsedTime = () => {
      const currentTime = new Date();
      const elapsedMilliseconds =
        currentTime.getTime() - props.startedAtDate.getTime();

      const minutes = Math.floor(elapsedMilliseconds / 60000);
      const seconds = Math.floor((elapsedMilliseconds % 60000) / 1000);

      setElapsedMinutes(`${minutes}`);
      setElapsedSeconds(`${seconds}`);
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  });

  const showSeconds =
    user()?.userPreferences?.some(
      (p) =>
        p.preference === Preference.SHOW_ELAPSED_SECONDS_IN_ACTIVE_SESSION &&
        p.enabled === true,
    ) ?? false;

  return (
    <h2 class="text-[#666666]">
      Elapsed time: {elapsedMinutes()} min
      {showSeconds ? ` ${elapsedSeconds()} sec` : ''}
    </h2>
  );
}
