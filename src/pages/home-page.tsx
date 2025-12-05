import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';
import { WorkoutViewManager } from '../components/workout-view-manager';
import LoadingSpinner from '../components/loading/loading-spinner';

export default function Home() {
  const navigate = useNavigate();
  const { user, isUserLoading } = useAuth();

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');
  }, [user, isUserLoading, navigate]);

  if (isUserLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-fit flex-col items-center">
      <WorkoutViewManager user={user} />
    </div>
  );
}
