import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';
import NavigationBar from '../components/navigation-bar';

export default function Layout() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        {/* Main content */}
        <main>
          <Outlet />
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col">
        {/* Main content */}
        <main>
          <Outlet />
          {/* have the bottom here */}
        </main>
        <nav className="relative z-50 bg-white">
          <NavigationBar />
        </nav>
      </div>
    );
  }
}
