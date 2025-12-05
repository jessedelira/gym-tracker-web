import { Link } from 'react-router-dom';

export function NoActiveRoutineView() {
  return (
    <div className="mt-12 flex h-full flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-xl font-medium text-gray-900">
        No Active Routine Selected
      </h1>
      <p className="mb-8 text-gray-600">
        You have routines created, but none are currently active. Select one to
        get started with your workouts.
      </p>
      <Link
        to="/manage/routines"
        className="rounded-xl bg-blue-600 px-8 py-4 text-base font-medium text-white shadow-md transition-all"
      >
        Select Active Routine
      </Link>
    </div>
  );
}
