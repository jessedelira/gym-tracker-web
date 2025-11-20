import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';
import LoadingSpinner from '../components/loading/loading-spinner';
import TrainingManageLink from '../components/training-manage-link';
import { useFetchActiveRoutine } from '../hooks/active-routine/use-fetch-active-routine';

export default function TrainingManagePage() {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();

  const { data: activeRoutine, isLoading: isRoutineLoading } =
    useFetchActiveRoutine(!!user);

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');
  }, [user, isUserLoading, navigate]);

  if (isUserLoading || !user) {
    return <LoadingSpinner />;
  } 

  return (
    <div className="flex h-full flex-col space-y-4 bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Manage Your Training
        </h1>
        <p className="mt-1 text-gray-600">
          Track and organize your workouts, sessions, and routines
        </p>
      </div>

      {/* Active Routine Status */}
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-medium text-gray-500">
              Active Routine
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {isRoutineLoading
                ? 'Loading...'
                : (activeRoutine?.name ?? 'No active routine selected')}
            </div>
          </div>
        </div>
      </div>

      {/* Management Options */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <TrainingManageLink
          href="/training/routines"
          title="Manage Routines"
          description="Collection of sessions for your week"
        />
        <div className="h-[1px] w-full bg-gray-100" />
        <TrainingManageLink
          href="/training/sessions"
          title="Manage Sessions"
          description="Workouts grouped by day"
        />
      </div>
    </div>
  );
}
