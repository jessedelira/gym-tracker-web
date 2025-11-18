import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GearNavBarIcon } from './icon/nav-bar/gear-nav-bar-icon';
import { HomeNavBarIcon } from './icon/nav-bar/home-nav-bar-icon';
import { ManageNavBarIcon } from './icon/nav-bar/manage-nav-bar-icon';

type ValidRoutes = 'home' | 'training' | 'settings' | '';

function isValidRoute(route: string): route is ValidRoutes {
  return ['home', 'training', 'settings', ''].includes(route);
};

export default function NavigationBar() {
  const [currentURL, setCurrentURL] = useState<ValidRoutes>('');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname?.split('/')[1] || '';
    if (isValidRoute(path)) {
      setCurrentURL(path);
    } else {
      setCurrentURL('');
    }
  }, [location.pathname]);

  return (
    <div className="mx-auto flex h-full max-w-md items-center justify-around border-t border-gray-200 bg-white pb-4">
      {/* Home */}
      <Link
        to="/home"
        className={`flex flex-col items-center px-6 py-2 ${
          currentURL === 'home'
            ? 'text-black'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        <HomeNavBarIcon
          heightValue="6"
          widthValue="6"
          fill="none"
          strokeColor={currentURL === 'home' ? 'black' : 'currentColor'}
        />
        <span className="mt-1 text-xs font-medium">Home</span>
      </Link>

      {/* Manage */}
      <Link
        to="/training"
        className={`flex flex-col items-center px-6 py-2 ${
          currentURL === 'training'
            ? 'text-black'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        <ManageNavBarIcon
          heightValue="6"
          widthValue="6"
          fill="none"
          strokeColor={currentURL === 'training' ? 'black' : 'currentColor'}
        />

        <span className="mt-1 text-xs font-medium">Manage</span>
      </Link>

      {/* Settings */}
      <Link
        to="/settings"
        className={`relative flex flex-col items-center px-6 py-2 ${
          currentURL === 'settings'
            ? 'text-black'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        {/* Red notification dot */}
        <div className="absolute top-1 right-4 h-2 w-2 rounded-full bg-red-500" />

        <GearNavBarIcon
          heightValue="6"
          widthValue="6"
          fill="none"
          strokeColor={currentURL === 'settings' ? 'black' : 'currentColor'}
        />

        <span className="mt-1 text-xs font-medium">Settings</span>
      </Link>
    </div>
  );
}
