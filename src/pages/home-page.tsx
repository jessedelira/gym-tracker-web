import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';
import LoadingSpinner from '../components/loading-spinner';
import { WorkoutViewManager } from '../components/workout-view-manager';

export default function Home() {
  const navigate = useNavigate();
  const { user, isUserLoading } = useAuth();

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');
  }, [user, navigate, isUserLoading]);

  if (isUserLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-full flex-col items-center">
      <WorkoutViewManager user={user} />
    </div>
  );
}
