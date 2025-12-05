import { useState, useEffect, type FormEvent } from 'react';
import CreateWorkoutModal from '../../components/modal/create-workout-modal';
import { useAuth } from '../../hooks/auth/use-auth';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading/loading-spinner';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useFetchAllExercises } from '../../hooks/exercise/use-fetch-all-exercises';
import {
  useCreateSession,
  type CreateSessionDto,
} from '../../hooks/session/use-create-session';
import { useAddSessionToActiveRoutine } from '../../hooks/session/use-add-session-to-active-routine';
import type { Session } from '../../types/session';
import { DayOfWeek } from '../../types/days';

interface CreateWorkoutData {
  exerciseId: string;
  weightLbs: number | null;
  reps: number | null;
  sets: number | null;
  durationSeconds: number | null;
  id: number;
}

export default function CreateSession() {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [dataChangeInForm, setDataChangeInForm] = useState(false);
  const [newWorkoutData, setNewWorkoutData] = useState<CreateWorkoutData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [sundayActive, setSundayActive] = useState(false);
  const [mondayActive, setMondayActive] = useState(false);
  const [tuesdayActive, setTuesdayActive] = useState(false);
  const [wednesdayActive, setWednesdayActive] = useState(false);
  const [thursdayActive, setThursdayActive] = useState(false);
  const [fridayActive, setFridayActive] = useState(false);
  const [saturdayActive, setSaturdayActive] = useState(false);
  const [workoutId, setWorkoutId] = useState(1);
  const [addToActiveRoutine, setAddToActiveRoutine] = useState(false);
  const [sessionName, setSessionName] = useState<string>('');
  const [sessionDescription, setSessionDescription] = useState<string>('');

  // Queries
  const { data: exercisesData } = useFetchAllExercises();

  // Mutations
  const { mutateAsync: createSessionMutation } = useCreateSession(); // also does the workouts ( custom exercise )
  const { mutateAsync: addSessionToActiveRoutine } =
    useAddSessionToActiveRoutine();

  async function handleSaveClicked(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    // Validate at least one day is selected
    const hasSelectedDay = [
      sundayActive,
      mondayActive,
      tuesdayActive,
      wednesdayActive,
      thursdayActive,
      fridayActive,
      saturdayActive,
    ].some((day) => day);

    if (!hasSelectedDay) {
      setErrorMessage('Please select at least one day of the week');
      return;
    }

    // Validate at least one workout is added when days are selected
    if (hasSelectedDay && newWorkoutData.length === 0) {
      setErrorMessage('Please add at least one workout to your session');
      return;
    }

    const activeDays = [
      { name: DayOfWeek.SUNDAY, active: sundayActive },
      { name: DayOfWeek.MONDAY, active: mondayActive },
      { name: DayOfWeek.TUESDAY, active: tuesdayActive },
      { name: DayOfWeek.WEDNESDAY, active: wednesdayActive },
      { name: DayOfWeek.THURSDAY, active: thursdayActive },
      { name: DayOfWeek.FRIDAY, active: fridayActive },
      { name: DayOfWeek.SATURDAY, active: saturdayActive },
    ]
      .filter((day) => day.active)
      .map((day) => day.name);

    const createSessionData: CreateSessionDto = {
      name: sessionName,
      description: sessionDescription,
      days: activeDays,
      workouts: newWorkoutData,
    };

    await createSessionMutation(createSessionData, {
      onSuccess: async (createdSession: Session) => {
        if (addToActiveRoutine) {
          console.log(createdSession.id);
          await addSessionToActiveRoutine({
            sessionId: createdSession.id,
          });
        }
        navigate('training/sessions');
      },
      onError: (error: Error) => {
        console.error('Session creation error:', error);
        setErrorMessage('Failed to create session. Please try again.');
      },
    });
  }

  function handleInputChange() {
    setDataChangeInForm(true);
  }

  function handleCancelClicked() {
    setDataChangeInForm(false);
    navigate('/training/manage/sessions');
  }

  function handlePlusButtonClicked() {
    setShowModal(true);
  }

  function handleButtonClicked(dayId: string) {
    setDataChangeInForm(true);
    switch (dayId) {
      case 'sunday':
        setSundayActive(!sundayActive);
        break;
      case 'monday':
        setMondayActive(!mondayActive);
        break;
      case 'tuesday':
        setTuesdayActive(!tuesdayActive);
        break;
      case 'wednesday':
        setWednesdayActive(!wednesdayActive);
        break;
      case 'thursday':
        setThursdayActive(!thursdayActive);
        break;
      case 'friday':
        setFridayActive(!fridayActive);
        break;
      case 'saturday':
        setSaturdayActive(!saturdayActive);
        break;
    }
  }

  function handleTrashCanClicked(id: number) {
    const newWorkoutDataFiltered = newWorkoutData.filter(
      (workout) => workout.id !== id,
    );
    setNewWorkoutData(newWorkoutDataFiltered);
  }

  function handleModalSaveClicked(workoutData: {
    exerciseId: string;
    weightLbs: number | null;
    sets: number | null;
    reps: number | null;
    durationSeconds: number | null;
  }): void {
    const newWorkout: CreateWorkoutData = {
      exerciseId: workoutData.exerciseId,
      weightLbs: workoutData.weightLbs,
      sets: workoutData.sets,
      reps: workoutData.reps,
      durationSeconds: workoutData.durationSeconds,
      id: workoutId,
    };

    setNewWorkoutData([...newWorkoutData, newWorkout]);
    setWorkoutId(workoutId + 1);
    setShowModal(false);
  }

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');
  }, [user, isUserLoading, navigate]);

  if (isUserLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {showModal && (
        <CreateWorkoutModal
          onXClick={() => setShowModal(false)}
          onSaveClick={handleModalSaveClicked}
          exercises={exercisesData ?? []}
        />
      )}
      <div className="flex min-h-fit flex-col bg-gray-50 px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Create New Session
          </h1>
          <p className="mt-2 text-gray-600">
            Set up your workout session and schedule
          </p>
        </div>

        <form onSubmit={(e) => void handleSaveClicked(e)} className="space-y-6">
          {/* Error Message Banner */}
          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {errorMessage}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Main Form Content */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            {/* Session Name */}
            <div className="mb-6">
              <label
                htmlFor="sessionName"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Session Name*
              </label>
              <input
                id="sessionName"
                className={`w-full rounded-xl border-2 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none`}
                placeholder="Enter session name"
                onChange={(e) => {
                  setSessionName(e.target.value);
                  handleInputChange();
                }}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="sessionDescription"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Description (optional)
              </label>
              <textarea
                id="sessionDescription"
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                placeholder="Describe your session"
                rows={3}
                onChange={(e) => {
                  setSessionDescription(e.target.value);
                  handleInputChange();
                }}
              />
            </div>

            {/* Days Selection */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Days of the Week*
              </label>
              <div className="grid grid-cols-7 gap-2">
                {[
                  {
                    id: 'sunday',
                    label: 'S',
                    isActive: sundayActive,
                  },
                  {
                    id: 'monday',
                    label: 'M',
                    isActive: mondayActive,
                  },
                  {
                    id: 'tuesday',
                    label: 'T',
                    isActive: tuesdayActive,
                  },
                  {
                    id: 'wednesday',
                    label: 'W',
                    isActive: wednesdayActive,
                  },
                  {
                    id: 'thursday',
                    label: 'T',
                    isActive: thursdayActive,
                  },
                  {
                    id: 'friday',
                    label: 'F',
                    isActive: fridayActive,
                  },
                  {
                    id: 'saturday',
                    label: 'S',
                    isActive: saturdayActive,
                  },
                ].map((day) => (
                  <button
                    key={day.id}
                    id={day.id}
                    type="button"
                    onClick={() => handleButtonClicked(day.id)}
                    className={`h-10 w-full rounded-lg font-medium transition-all focus:ring-2 focus:ring-blue-200 focus:outline-none ${
                      day.isActive
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Workouts Section */}
          {(sundayActive ||
            mondayActive ||
            tuesdayActive ||
            wednesdayActive ||
            thursdayActive ||
            fridayActive ||
            saturdayActive) && (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-medium text-gray-900">
                Workouts
              </h2>
              <button
                type="button"
                onClick={() => void handlePlusButtonClicked()}
                className="mb-4 w-full rounded-xl border-2 border-dashed border-gray-300 bg-white py-4 text-center text-sm font-medium text-gray-600 transition-all hover:border-gray-400 hover:bg-gray-50"
              >
                {/* <PlusIcon className="mx-auto h-6 w-6" /> */}
                <span className="mt-2 block">Add Workout</span>
              </button>

              {/* Workouts List */}
              {newWorkoutData.length > 0 && (
                <div className="mt-4 space-y-2">
                  {newWorkoutData.map((workout) => (
                    <div
                      key={workout.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="font-medium text-gray-900">
                        {
                          exercisesData?.find(
                            (exercise) => exercise.id === workout.exerciseId,
                          )?.name
                        }{' '}
                        {workout.durationSeconds
                          ? // Display duration in minutes
                            `- ${Math.floor(
                              workout.durationSeconds / 60,
                            )} minutes`
                          : // Display sets and reps for weighted exercises
                            `- ${workout.sets} x ${workout.reps} - Lbs: ${workout.weightLbs}`}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleTrashCanClicked(workout.id)}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                      >
                        <TrashIcon className="size-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add to Active Routine Option */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={addToActiveRoutine}
                onChange={(e) => setAddToActiveRoutine(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-900">
                Add this session to your active routine
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          {dataChangeInForm && (
            <div className="!mb-2 flex space-x-4">
              <button
                type="submit"
                // disabled={!!errorMessage}
                className="flex-1 rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-gray-400"
              >
                Save Session
              </button>
              <button
                type="button"
                onClick={handleCancelClicked}
                className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
