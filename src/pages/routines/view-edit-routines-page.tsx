import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/auth/use-auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchEnrichedRoutineById } from '../../hooks/routine/use-fetch-enriched-routine-by-id';
import LoadingSpinner from '../../components/loading/loading-spinner';
import { TrashIcon } from '@heroicons/react/24/outline';
import type { Session } from '../../types/session';

export default function ViewEditRoutines() {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();
  const { routineId } = useParams<{ routineId: string }>();

  // Form State
  const [name, setName] = useState<string>('');
  const [dataHasChangedInForm, setDataHasChangedInForm] =
    useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [sundayTaken, setSundayTaken] = useState<boolean>(false);
  const [mondayTaken, setMondayTaken] = useState<boolean>(false);
  const [tuesdayTaken, setTuesdayTaken] = useState<boolean>(false);
  const [wednesdayTaken, setWednesdayTaken] = useState<boolean>(false);
  const [thursdayTaken, setThursdayTaken] = useState<boolean>(false);
  const [fridayTaken, setFridayTaken] = useState<boolean>(false);
  const [saturdayTaken, setSaturdayTaken] = useState<boolean>(false);
  const [sessionsNotOnExistingRoutine, setSessionsNotOnExistingRoutine] =
    useState<Session[]>([]);
  const [sessionsOnExistingRoutine, setSessionsOnExistingRoutine] = useState<
    Session[]
  >([]);

  const {
    data: existingRoutineDetails,
    isLoading: isRoutineLoading,
    error: routineErrorMessage,
  } = useFetchEnrichedRoutineById(routineId ?? '');

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');
  }, [user, isUserLoading, navigate]);

  if (isRoutineLoading) return <LoadingSpinner />;

  function handleSave(e: React.FormEvent<HTMLFormElement>): void {
    console.log('save!');
    console.log(e);
  }

  function handleRemoveSession(sessionId: string): void {
    console.log('handleRemoveSession ');
    console.log(sessionId);
  }

  return (
    <div className="flex h-full flex-col bg-gray-50 px-4 py-6">
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
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
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
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

          <div className="mb-6 flex justify-center gap-2">
            {[
              { label: 'S', taken: sundayTaken },
              { label: 'M', taken: mondayTaken },
              { label: 'T', taken: tuesdayTaken },
              { label: 'W', taken: wednesdayTaken },
              { label: 'T', taken: thursdayTaken },
              { label: 'F', taken: fridayTaken },
              { label: 'S', taken: saturdayTaken },
            ].map((day, index) => (
              <div
                key={index}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gray-200 text-lg font-medium ${
                  day.taken
                    ? 'bg-green-100 text-green-800'
                    : 'bg-white text-gray-600'
                }`}
              >
                {day.label}
              </div>
            ))}
          </div>

          <div className="mb-6 flex gap-2">
            <select
              id="sessionId"
              className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900"
            >
              <option value="">Select a session</option>
              {sessionsNotOnExistingRoutine.map((session) => (
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
                // if (sessionId) {
                //   void handleAddSession(sessionId);
                // }
              }}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
            >
              Add Session
            </button>
          </div>

          <div className="space-y-3">
            {sessionsOnExistingRoutine.map((session) => (
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
                      {dayActive.day}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {dataHasChangedInForm && (
          <div className="flex space-x-4 mt-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-600 px-4 py-4 text-base font-medium text-white shadow-md"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => void navigate('/training/routines')}
              className="flex-1 rounded-xl border-2 border-gray-200 bg-white px-4 py-4 text-base font-medium text-gray-700 shadow-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
