import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BaseOutlineIcon } from './base-outline-icon';

type ValidRoutes = 'home' | 'manage' | 'settings' | '';

const isValidRoute = (route: string): route is ValidRoutes => {
  return ['home', 'manage', 'settings', 'clock', ''].includes(route);
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
        <BaseOutlineIcon
          strokeColor={currentURL === 'home' ? 'black' : 'currentColor'}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </BaseOutlineIcon>
        <span className="mt-1 text-xs font-medium">Home</span>
      </Link>

      {/* Manage */}
      <Link
        to="/manage"
        className={`flex flex-col items-center px-6 py-2 ${
          currentURL === 'manage'
            ? 'text-black'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        <BaseOutlineIcon
          strokeColor={currentURL === 'manage' ? 'black' : 'currentColor'}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
          />
        </BaseOutlineIcon>
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

        <BaseOutlineIcon
          strokeColor={currentURL === 'settings' ? 'black' : 'currentColor'}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </BaseOutlineIcon>

        <span className="mt-1 text-xs font-medium">Settings</span>
      </Link>
    </div>
  );
}
