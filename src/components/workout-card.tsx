import { ExerciseType } from '../types/exercise-type';

interface WorkoutCardProps {
  workoutId: string;
  exerciseName: string;
  // eslint-disable-next-line no-unused-vars
  onChangeHandler: (event: Event & { currentTarget: HTMLInputElement }) => void;
  sets?: number | null;
  weightInLbs?: number | null;
  reps?: number | null;
  durationSeconds?: number | null;
  exerciseType: ExerciseType;
  isChecked: boolean | null;
}

export function WorkoutCard(props: WorkoutCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <h3 class="text-base font-medium text-gray-900">
            {props.exerciseName}
          </h3>
          <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            {props.exerciseType === ExerciseType.WEIGHTED ? (
              <>
                <span>{props.sets} sets</span>
                <span>{props.reps} reps</span>
                <span>{props.weightInLbs} lbs</span>
              </>
            ) : (
              <span>{formatDuration(props.durationSeconds ?? 0)}</span>
            )}
          </div>
        </div>
        <div class="ml-4">
          <input
            type="checkbox"
            id={props.workoutId}
            checked={props.isChecked ?? false}
            class="h-5 w-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
            onChange={(e) => props.onChangeHandler(e)}
          />
        </div>
      </div>
    </div>
  );
}
