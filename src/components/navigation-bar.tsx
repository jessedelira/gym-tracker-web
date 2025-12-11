import { useLocation, Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

type ValidRoutes = 'home' | 'training' | 'settings' | '';

function isValidRoute(route: string): route is ValidRoutes {
  return ['home', 'training', 'settings', ''].includes(route);
}

export default function NavigationBar() {
  const location = useLocation();
  const path = location.pathname?.split('/')[1] || '';

  function currentURL() {
    if (isValidRoute(path)) {
      return path;
    } else {
      return '';
    }
  }

  return (
    <div className="mx-auto flex h-full max-w-md items-center justify-around border-t border-gray-200 bg-white pb-4">
      {/* Home */}
      <Link
        to="/home"
        className={`flex flex-col items-center px-6 py-2 ${
          currentURL() === 'home' ? 'text-black' : 'text-gray-500'
        }`}
      >
        <HomeIcon
          className={`size-6 ${currentURL() === 'home' ? 'stroke-black' : ''}`}
        />
        <span className="mt-1 text-xs font-medium">Home</span>
      </Link>

      {/* Manage */}
      <Link
        to="/training"
        className={`flex flex-col items-center px-6 py-2 ${
          currentURL() === 'training' ? 'text-black' : 'text-gray-500'
        }`}
      >
        <SquaresPlusIcon
          className={`size-6 ${currentURL() === 'training' ? 'stroke-black' : ''}`}
        />

        <span className="mt-1 text-xs font-medium">Manage</span>
      </Link>

      {/* Settings */}
      <Link
        to="/settings"
        className={`relative flex flex-col items-center px-6 py-2 ${
          currentURL() === 'settings' ? 'text-black' : 'text-gray-500'
        }`}
      >
        {/* Red notification dot */}
        <div className="absolute top-1 right-4 h-2 w-2 rounded-full bg-red-500" />

        <Cog8ToothIcon
          className={`size-6 ${currentURL() === 'settings' ? 'stroke-black' : ''}`}
        />

        <span className="mt-1 text-xs font-medium">Settings</span>
      </Link>
    </div>
  );
}
