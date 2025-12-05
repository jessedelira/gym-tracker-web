import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/use-auth';
import { useFetchAllSessions } from '../../hooks/session/use-fetch-all-sessions';
import { useDeleteSession } from '../../hooks/session/use-delete-session';
import LoadingSpinner from '../../components/loading/loading-spinner';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function ManageSessions() {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();

  const {
    data: sessions,
    isLoading: isSessionsLoading,
    refetch: refetchSessions,
  } = useFetchAllSessions();

  const { mutate: deleteSession } = useDeleteSession();

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');
  }, [user, isUserLoading, navigate]);

  function handleDeleteSession(sessionId: string): void {
    deleteSession(sessionId, {
      onSuccess: () => {
        void refetchSessions();
      },
    });
  }

  if (isUserLoading || isSessionsLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-full flex-col bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Manage Sessions
        </h1>
        <p className="mt-2 text-gray-600">
          Create and organize your workout sessions
        </p>
      </div>

      {/* New Session Button */}
      <div className="mb-6">
        <Link
          to="/training/sessions/create"
          className="block w-full rounded-xl bg-blue-600 px-8 py-4 text-center text-base font-medium text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
        >
          Create New Session
        </Link>
      </div>

      {/* Sessions List */}
      {sessions && sessions.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            No sessions yet. Create your first session to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions?.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300"
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {session.name}
                </h3>
                {session.description && (
                  <p className="mt-1 text-sm text-gray-600">
                    {session.description.length > 100
                      ? `${session.description.substring(0, 100)}...`
                      : session.description}
                  </p>
                )}
              </div>
              <div className="ml-4 flex items-center space-x-3">
                <Link
                  to={`/training/sessions/${session.id}`}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
                  title="Edit session"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDeleteSession(session.id)}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                  title="Delete session"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
