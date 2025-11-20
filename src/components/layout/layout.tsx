import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/use-auth';
import NavigationBar from '../navigation-bar';

export default function Layout() {
  const { user, isUserLoading } = useAuth();

  if (!user && !isUserLoading) {
    return (
      <div className="flex h-screen flex-col">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Scrollable main content area, pb-19 since that is the height of the navbar */}
      <main className="flex-1 overflow-y-auto pb-19">
        <Outlet />
      </main>

      {/* Fixed bottom navbar */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white">
        <NavigationBar />
      </nav>
    </div>
  );
}
