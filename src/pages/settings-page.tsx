import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/use-auth';
import LoadingSpinner from '../components/loading-spinner';
import { getMonthDDCommaYYYY } from '../utils/date-util';
import { useLogout } from '../hooks/auth/use-logout';
import { LogoutIcon } from '../components/icon/logout-icon';
import { AccountIcon } from '../components/icon/account-icon';
import { ChangelogIcon } from '../components/icon/changelog-icon';
import { ChevronRightIcon } from '../components/icon/chevron-right-icon';
import { LanguageIcon } from '../components/icon/language-icon';
import { PreferencesIcon } from '../components/icon/preferences-icon';

export default function Settings() {
  const { user, isUserLoading } = useAuth();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  useEffect(() => {
    if (!user && !isUserLoading) navigate('/');
  }, [user, isUserLoading, navigate]);

  if (isUserLoading || !user) {
    return <LoadingSpinner />;
  }
  
  function test() {
    console.log('hi')
  }


  return (
    <div className="flex h-full flex-col pb-4">
      {/* Profile card */}
      <div className="mx-4 mt-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center space-x-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-gray-500">
              Member since {getMonthDDCommaYYYY(user.dateCreated)}
            </p>
            {user.username && (
              <p className="text-sm text-gray-500">@{user.username}</p>
            )}
          </div>
        </div>
      </div>

      {/* Settings list */}
      <div className="mx-4 mt-6 space-y-0.5 rounded-lg border border-gray-200 bg-white">
        {/* Account */}
        <Link
          to="/settings/account"
          className="flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <AccountIcon />
            <span className="text-base">Account</span>
          </div>
          <ChevronRightIcon />
        </Link>
        <div className="h-[1px] w-full bg-gray-200" />
        {/* Preferences */}
        <Link
          to="/settings/preferences"
          className="flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <PreferencesIcon />
            <span className="text-base">Preferences</span>
          </div>
          <ChevronRightIcon />
        </Link>
        <div className="h-[1px] w-full bg-gray-200" />
        {/* Changelog */}
        <Link
          to="/settings/changelog"
          className="flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <ChangelogIcon />
            <span className="text-base">Changelog</span>
            {!user.hasSeenLatestChangelog && (
              <div className="h-2 w-2 rounded-full bg-red-500" />
            )}
          </div>
          <ChevronRightIcon />
        </Link>
        <div className="h-[1px] w-full bg-gray-200" />
        {/* Language */}
        <Link
          to="/settings/language"
          className="flex items-center justify-between p-4 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <LanguageIcon />
            <span className="text-base">Language</span>
          </div>
          <ChevronRightIcon />
        </Link>
      </div>

      {/* Logout */}
      <div className="mx-4 mt-6">
        <button
          onClick={() => logout()}
          className="flex w-full items-center justify-center rounded-lg border border-red-200 bg-white p-4 text-red-600 hover:bg-red-50"
        >
          <div className="flex items-center space-x-3">
            <LogoutIcon />
            <span>Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}
