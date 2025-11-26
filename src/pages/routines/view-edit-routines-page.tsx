import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth/use-auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchEnrichedRoutineById } from '../../hooks/routine/use-fetch-enriched-routine-by-id';
import LoadingSpinner from '../../components/loading/loading-spinner';
import { TrashIcon } from '@heroicons/react/24/outline';
import type { Session } from '../../types/session';
import { useFetchSessionsWithNoRoutine } from '../../hooks/session/use-fetch-sessions-with-no-routine';

export default function ViewEditRoutines() {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();
  const { routineId } = useParams<{ routineId: string }>();

  // Form State
  const [routineName, setRoutineName] = useState<string>('');
  const [dataHasChangedInForm, setDataHasChangedInForm] =
    useState<boolean>(false);
  const [routineDescription, setRoutineDescription] = useState<string | null>(
    '',
  );
  const [availableSessions, setAvailableSessions] = useState<Session[]>();
  const [sessionsOnRoutine, setSessionsOnRoutine] = useState<Session[]>();

  // Queries
  const {
    data: existingRoutineDetails,
    isLoading: isRoutineLoading,
    error: routineErrorMessage,
  } = useFetchEnrichedRoutineById(routineId ?? '');

  const { data: sessionsNotOnExistingRoutine } =
    useFetchSessionsWithNoRoutine();

  // Mutations

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');

    if (existingRoutineDetails) {
      setRoutineDescription(existingRoutineDetails.description);
      setRoutineName(existingRoutineDetails.name);
      setSessionsOnRoutine(existingRoutineDetails.sessions);
    }

    if (sessionsNotOnExistingRoutine) {
      setAvailableSessions(sessionsNotOnExistingRoutine);
    }
  }, [
    user,
    isUserLoading,
    navigate,
    existingRoutineDetails,
    sessionsNotOnExistingRoutine,
  ]);

  function handleSave(e: React.FormEvent<HTMLFormElement>): void {
    console.log('save!');
    console.log(e);
  }

  function canSubmit(): boolean {
    return !!routineName && !!sessionsOnRoutine && sessionsOnRoutine.length > 0;
  }

  function handleRemoveSession(sessionId: string): void {
    setDataHasChangedInForm(true);
    const sessionToBeRemoved = sessionsOnRoutine?.find(
      (session) => session.id === sessionId,
    );
    setSessionsOnRoutine(
      sessionsOnRoutine?.filter((session) => session.id !== sessionId),
    );

    if (availableSessions && sessionToBeRemoved) {
      setAvailableSessions([...availableSessions, sessionToBeRemoved]);
    }
  }

  function handleAddSession(sessionId: string) {
    setDataHasChangedInForm(true);
    const sessionToBeAdded = availableSessions?.find(
      (session) => session.id === sessionId,
    );
    setAvailableSessions(
      availableSessions?.filter((session) => session.id !== sessionId),
    );

    if (sessionsOnRoutine && sessionToBeAdded) {
      setSessionsOnRoutine([...sessionsOnRoutine, sessionToBeAdded]);
    }
  }

  if (isRoutineLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-full bg-gray-50">
      <div className="flex flex-col px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Edit Routine
          </h1>
          <p className="mt-2 text-gray-600">
            Modify your routine details and manage sessions
          </p>
        </div>

        <form onSubmit={(e) => void handleSave(e)} className="space-y-6">
          {routineErrorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">
                {routineErrorMessage.message}
              </p>
            </div>
          )}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Routine Name*
                </label>
                <input
                  type="text"
                  id="name"
                  value={routineName}
                  onChange={(e) => {
                    setRoutineName(e.target.value);
                    setDataHasChangedInForm(true);
                  }}
                  className="mt-1 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-900"
                >
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  value={routineDescription ?? ''}
                  onChange={(e) => {
                    setRoutineDescription(e.target.value);
                    setDataHasChangedInForm(true);
                  }}
                  className="mt-1 w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-medium text-gray-900">
              Manage Sessions
            </h2>

            <div className="mb-6 flex gap-2">
              <select
                id="sessionId"
                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900"
              >
                <option value="">Select a session</option>
                {availableSessions?.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={async () => {
                  const select = document.getElementById(
                    'sessionId',
                  ) as HTMLSelectElement;
                  const sessionId = select.value;
                  console.log(sessionId);
                  if (sessionId) {
                    void handleAddSession(sessionId);
                  }
                }}
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
              >
                Add Session
              </button>
            </div>

            <div className="space-y-3">
              {sessionsOnRoutine?.map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      {session.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => void handleRemoveSession(session.id)}
                      className="rounded-full p-2 text-gray-400 transition-all hover:bg-gray-200 hover:text-red-500"
                    >
                      <TrashIcon className="size-5" />
                    </button>
                  </div>

                  {/* Days display */}
                  <div className="flex flex-wrap gap-1.5">
                    {session.daysActive?.map((dayActive, index) => (
                      <div
                        key={index}
                        className="rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700"
                      >
                        {dayActive.day.toString().slice(0, 3).toLowerCase()}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {dataHasChangedInForm && (
            <div className="mt-2 flex space-x-4">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-600 px-4 py-4 text-base font-medium text-white shadow-md"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate('/training/routines')}
                disabled={canSubmit()}
                className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-4 text-base font-medium text-gray-700 shadow-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
