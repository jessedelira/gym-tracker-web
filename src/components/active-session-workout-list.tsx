import { For } from 'solid-js';
import { ActiveSession } from '../types/active-session';
import { Workout } from '../types/workout';
import { ActiveSessionElapsedTimer } from './active-session-elapsed-timer';
import { WorkoutCard } from './workout-card';

interface ActiveSessionWorkoutListProps {
  activeSession: ActiveSession;
  workoutsForActiveSession: Workout[];
  // eslint-disable-next-line no-unused-vars, no-undef
  handleCheckboxChange: (event: Event & { currentTarget: HTMLInputElement }) => void;
  handleCompleteSessionClick: () => void;
  isEveryWorkoutComplete: boolean; // TODO: could create a memoized value
}

export function ActiveSessionWorkoutList(props: ActiveSessionWorkoutListProps) {
  
  function onChangeHandler(event: Event) {
    console.log(`event: ${event}`)
    console.log('you triggered the onChangeHandler')
  }
  
  return (
    <div class="flex h-full w-[95%] flex-col items-center">
      <div class="w-[90%] flex-1 flex-col pt-4">
        <div class="mb-4 w-full rounded-lg bg-gray-50 p-4">
          <h1 class="text-base font-medium text-gray-900">
            {props.activeSession?.session?.name}
          </h1>
          {props.activeSession.startedAt && (
            <ActiveSessionElapsedTimer
              startedAtDate={new Date(props.activeSession.startedAt)}
            />
          )}
        </div>

        <div class="flex-1 space-y-3 overflow-auto pb-24">
          <For each={props.workoutsForActiveSession}>
            {(workout) => (
              <WorkoutCard
                workoutId={workout.id}
                exerciseName={workout.exercise.name}
                onChangeHandler={onChangeHandler}
                sets={workout.sets}
                weightInLbs={workout.weightLbs}
                reps={workout.reps}
                durationSeconds={workout.durationSeconds}
                exerciseType={workout.exercise.type}
                isChecked={workout.isCompletedWhileActive}
              />
            )}
          </For>
        </div>

        <div
          class={`fixed inset-x-0 bottom-0 z-20 transform transition-all duration-300 ${
            props.isEveryWorkoutComplete
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-full opacity-0'
          }`}
        >
          <div class="z-20 mb-20 p-4">
            <div class="mx-auto w-[90%] max-w-md">
              <button
                onClick={() => void props.handleCompleteSessionClick()}
                class="w-full rounded-xl bg-green-600 px-4 py-4 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                Complete Workout Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
