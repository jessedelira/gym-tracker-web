import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';
import LoadingSpinner from '../components/loading-spinner';
import type { Session } from '../types/session';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function ManageSessions() {
  const { user, isUserLoading } = useAuth();
  const [sessionState, setSessionState] = useState<Session[]>([]);
  const navigate = useNavigate();

  const { data: sessionsData, isLoading: isSessionsLoading } = useFetchSessions(
    user?.id,
  );
  const { mutate: deleteSessionMutation } = useDeleteSession();

  function handleTrashCanClicked(sessionId: string) {
    deleteSessionMutation(
      { sessionId },
      {
        onSuccess: () => {
          setSessionState(
            sessionState.filter((session) => session.id !== sessionId),
          );
        },
      },
    );
  }

  useEffect(() => {
    if (!user && !isUserLoading) {
      navigate('/');
    } else if (sessionsData) {
      setSessionState(sessionsData);
    }
  }, [user, isUserLoading, sessionsData, navigate]);

  if (isUserLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-full flex-col bg-gray-50 px-4 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Manage Sessions
          </h1>
          <Link
            to="/training/sessions/create"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700"
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
      </div>

      {/* Sessions List */}
      {isSessionsLoading ? (
        <LoadingSpinner />
      ) : !sessionsData || sessionsData.length === 0 ? (
        <div className="mt-8 text-center">
          <div className="mb-4 inline-flex rounded-full bg-blue-100 p-4">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="text-gray-600">
            Create your first session to get started
          </h2>
        </div>
      ) : (
        <div className="space-y-3">
          {sessionState.map((session) => (
            <div
              key={session.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {session.name}
                  </h3>
                  {session.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {session.description.length > 35
                        ? session.description.substring(0, 35) + '...'
                        : session.description}
                    </p>
                  )}
                </div>
                <div className="ml-4 flex items-center gap-3">
                  <Link
                    to={`/training/sessions/edit/${session.id}`}
                    className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleTrashCanClicked(session.id)}
                    className="rounded-lg p-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-red-600"
                    title="Delete session"
                  >
                    <TrashIcon className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
