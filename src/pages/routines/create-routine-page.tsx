import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/use-auth';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/loading/loading-spinner';
import { useCreateRoutine } from '../../hooks/routine/use-create-routine';

export default function CreateRoutine() {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();

  const [routineName, setRoutineName] = useState<string>('');
  const [routineDescription, setRoutineDescription] = useState<string>('');
  const [dataHasChangedInForm, setDataHasChangedInForm] =
    useState<boolean>(false);

  const { mutateAsync: createRoutine, error, reset } = useCreateRoutine();

  function handleInputChange(): void {
    setDataHasChangedInForm(true);
  }

  function handleCancelClicked(): void {
    setDataHasChangedInForm(false);
    setRoutineName('');
    setRoutineDescription('');
    reset();
  }

  async function handleSaveClicked(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (!user) return;

    await createRoutine(
      {
        name: routineName,
        description: routineDescription || null,
        userId: user.id,
      },
      {
        onSuccess: () => {
          void navigate('/training/routines');
        },
      },
    );
  }

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');
  }, [user, isUserLoading, navigate]);

  if (isUserLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-full flex-col bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Create New Routine
        </h1>
        <p className="mt-2 text-gray-600">
          Set up a new workout routine with custom exercises
        </p>
      </div>

      {/* Form */}
      <form onSubmit={(e) => void handleSaveClicked(e)} className="space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          {/* Routine Name */}
          <div className="mb-6">
            <label
              htmlFor="routineName"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Routine Name
            </label>
            <input
              id="routineName"
              value={routineName}
              onChange={(e) => {
                setRoutineName(e.target.value);
                handleInputChange();
              }}
              className={`w-full rounded-xl border-2 ${
                error ? 'border-red-500' : 'border-gray-200'
              } bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none`}
              placeholder="Enter routine name"
              required
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="routineDescription"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
              id="routineDescription"
              value={routineDescription}
              onChange={(e) => {
                setRoutineDescription(e.target.value);
                handleInputChange();
              }}
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              placeholder="Describe your routine"
              rows={4}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`space-y-3 ${!dataHasChangedInForm && 'hidden'}`}>
          <button
            type="submit"
            disabled={!routineName.trim()}
            className="w-full rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Routine
          </button>
          <button
            type="button"
            onClick={handleCancelClicked}
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>

        {/* Helper Text */}
        {!dataHasChangedInForm && (
          <div className="text-center text-sm text-gray-500">
            Start typing to create your routine
          </div>
        )}
      </form>
    </div>
  );
}
