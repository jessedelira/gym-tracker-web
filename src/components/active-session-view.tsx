import { ActiveSession } from '../types/active-session';
import { Workout } from '../types/workout';
import { WorkoutCompletionMap } from '../types/workout-completion-map';

interface WorkoutListProps {
  activeSession: ActiveSession;
  workoutsForActiveSession: Workout[];
  // eslint-disable-next-line no-unused-vars
  handleCheckboxChange: (event: Event) => void;
  handleCompleteSessionClick: () => Promise<void>;
  isEveryWorkoutComplete: boolean;
  workoutProgressMap: WorkoutCompletionMap;
}

export function ActiveSessionWorkoutView(props: WorkoutListProps) {
  return (
    <div class="flex h-full w-[95%] flex-col items-center">
      <div class="w-[90%] flex-1 flex-col pt-4">
        {/* Active session header */}
        <div class="mb-4 w-full rounded-lg bg-gray-50 p-4">
          <h1 class="text-base font-medium text-gray-900">
            {props.activeSession?.session?.name}
          </h1>
          {props.activeSession?.startedAt && (
            <CurrentSessionElapsedTimer
              startedAtDate={new Date(activeSession.startedAt)}
            />
          )}
        </div>

        {/* Workout list */}
        <div class="flex-1 space-y-3 overflow-auto pb-24">
          {/*{workoutsForActiveSession.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workoutId={workout.id}
              exerciseName={workout.exercise?.name ?? ''}
              onChangeHandler={handleCheckboxChange}
              sets={workout.sets}
              weightInLbs={workout.weightLbs}
              reps={workout.reps}
              durationSeconds={workout.durationSeconds}
              exerciseType={workout.exercise?.type}
              isChecked={workoutProgressMap[workout.id] || false}
            />
          ))}*/}
        </div>

        {/* Complete session button (visible only when all workouts complete) */}
        <div
          class={`fixed inset-x-0 bottom-0 z-20 transform transition-all duration-300 ${
            isEveryWorkoutComplete
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-full opacity-0'
          }`}
        >
          <div class="z-20 mb-20 p-4">
            <div class="mx-auto w-[90%] max-w-md">
              <button
                onClick={() => void props.handleCompleteSessionClick()}
                class="w-full rounded-xl bg-green-600 px-4 py-4 text-sm font-medium text-white transition-colors"
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
