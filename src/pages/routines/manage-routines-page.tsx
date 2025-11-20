import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/use-auth';
import LoadingSpinner from '../../components/loading/loading-spinner';
import { useFetchActiveRoutine } from '../../hooks/active-routine/use-fetch-active-routine';

import type { Routine } from '../../types/routine';
import { useRemoveActiveRoutine } from '../../hooks/active-routine/use-remove-active-routine';
import { useSetActiveRoutine } from '../../hooks/active-routine/use-set-active-routine';
import { useFetchRoutines } from '../../hooks/routine/use-fetch-routines';
import { PencilIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';

const ACTIVE_STAR_CLASSES = 'h-6 w-6 text-yellow-400 fill-current';
const INACTIVE_STAR_CLASSES = 'h-6 w-6 text-gray-400 transition-colors';

export default function ManageRoutines() {
  const { user, isUserLoading } = useAuth();
  const [activeRoutine, setActiveRoutine] = useState<Routine | null>(null);
  const navigate = useNavigate();

  const { data: routineData, isLoading: isRoutinesLoading } = useFetchRoutines(
    user?.id,
  );
  const { data: activeRoutineData, isLoading: isActiveRoutineLoading } =
    useFetchActiveRoutine(!!user);
  const { mutate: setActiveRoutineMutation } = useSetActiveRoutine();
  const { mutate: removeActiveRoutineMutation } = useRemoveActiveRoutine(
    user?.id,
  );

  function onStarClick(routineId: string) {
    if (activeRoutine && activeRoutine.id === routineId) {
      removeActiveRoutineMutation();
      setActiveRoutine(null);
      return;
    }

    setActiveRoutineMutation({ routineId });
    const clickedRoutine = routineData?.find(
      (routine) => routine.id === routineId,
    );
    if (clickedRoutine) {
      setActiveRoutine(clickedRoutine);
    }
  }

  useEffect(() => {
    if (!user && !isUserLoading) {
      navigate('/');
    } else if (activeRoutineData) {
      setActiveRoutine(activeRoutineData);
    }
  }, [user, isUserLoading, activeRoutineData, navigate]);

  if (isUserLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-full flex-col bg-gray-50 px-4 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Manage Routines
          </h1>
          <Link
            to="/training/routines/create"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Link>
        </div>

        {/* Active Routine Status */}
        <div className="mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Active Routine</p>
          <p className="mt-1 text-lg text-gray-900">
            {isActiveRoutineLoading
              ? 'Loading...'
              : activeRoutine
                ? activeRoutine.name.length > 30
                  ? activeRoutine.name.substring(0, 30) + '...'
                  : activeRoutine.name
                : 'No active routine selected'}
          </p>
        </div>
      </div>

      {/* Routines List */}
      {isRoutinesLoading ? (
        <LoadingSpinner />
      ) : !routineData || routineData.length === 0 ? (
        <div className="mt-8 text-center">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 p-4">
            <PlusIcon className="size-6 stroke-blue-600" />
          </div>
          <h2 className="text-gray-600">
            Create your first routine to get started
          </h2>
        </div>
      ) : (
        <div className="space-y-3">
          {routineData.map((routine) => (
            <div
              key={routine.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {routine.name}
                  </h3>
                  {routine.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {routine.description.length > 35
                        ? routine.description.substring(0, 35) + '...'
                        : routine.description}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex items-center gap-3">
                  <button
                    onClick={() => onStarClick(routine.id)}
                    className="rounded-lg p-2 transition-all"
                    title={
                      activeRoutine && routine.id === activeRoutine.id
                        ? 'Active Routine'
                        : 'Set as Active Routine'
                    }
                  >
                    {activeRoutine && routine.id === activeRoutine.id ? (
                      <StarIcon className={ACTIVE_STAR_CLASSES} />
                    ) : (
                      <StarIcon className={INACTIVE_STAR_CLASSES} />
                    )}
                  </button>
                  <Link
                    to={`/training/routines/${routine.id}`}
                    className="rounded-lg p-2 text-gray-600 transition-all"
                  >
                    <PencilIcon className="size-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
