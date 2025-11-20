import { useEffect } from 'react';
import { useAuth } from '../../hooks/auth/use-auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchRoutineById } from '../../hooks/routine/use-fetch-routine-by-id';
import LoadingSpinner from '../../components/loading/loading-spinner';

export default function ViewEditRoutines() {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();
  const { routineId } = useParams<{ routineId: string }>();
  
  const { data: routine, isLoading: isRoutineLoading } = useFetchRoutineById(routineId ?? '')
  
  console.log(routine)

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');
  }, [user, isUserLoading, navigate]);

  
  if(isRoutineLoading)
    return <LoadingSpinner/>
  
  
  return <div>{routine?.id}</div>;
}
