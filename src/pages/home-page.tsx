import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';
import LoadingSpinner from '../components/loading-spinner';
import { WorkoutViewManager } from '../components/workout-view-manager';

export default function Home() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user && !isLoading) navigate('/');
  }, [user, navigate, isLoading]);

  if (isLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-full flex-col items-center">
      <WorkoutViewManager
        user={{
          userPreferences: user.userPreferences,
        }}
      />
    </div>
  );
}
