import { createMemo } from 'solid-js';
import { Session } from '../types/session';

interface WorkoutSessionCardProps {
  session: Session;
  listOfCompletedSessionIds: string[];
  // eslint-disable-next-line no-unused-vars
  onStartSession: (sessionId: string) => void;
}

export function WorkoutSessionCard(props: WorkoutSessionCardProps) {
  function handleClick() {
    void props.onStartSession(props.session.id);
  }

  const isCompleted = createMemo(() =>
    props.listOfCompletedSessionIds?.includes(props.session.id),
  );

  return (
    <div class="w-11/12 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="mb-2">
        <h2 class="text-lg font-medium text-gray-900">{props.session.name}</h2>
        {props.session.description && (
          <p class="mt-1 text-sm text-gray-500">{props.session.description}</p>
        )}
      </div>
      <button
        onClick={handleClick}
        disabled={isCompleted()}
        class={`mt-3 w-full rounded-lg px-4 py-2.5 text-sm font-medium ${
          isCompleted() ? 'bg-gray-100 text-gray-400' : 'bg-blue-600 text-white'
        }`}
      >
        {isCompleted() ? 'Completed' : 'Start Session'}
      </button>
    </div>
  );
}
