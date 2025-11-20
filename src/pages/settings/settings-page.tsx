import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/use-auth';
import LoadingSpinner from '../../components/loading/loading-spinner';
import { getMonthDDCommaYYYY } from '../../utils/date-util';
import { useLogout } from '../../hooks/auth/use-logout';

import { ChevronRightIcon, UserIcon } from '@heroicons/react/24/outline';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';

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

  return (
    <div className="flex h-full flex-col pb-4">
      {/* Profile card */}
      <div className="mx-4 mt-6 rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center space-x-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
            <UserIcon className="size-8 stroke-gray-600" />
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
          className="flex items-center justify-between p-4 "
        >
          <div className="flex items-center space-x-3">
            <UserIcon className="size-5 stroke-gray-500" />
            <span className="text-base">Account</span>
          </div>
          <ChevronRightIcon className="size-5 stroke-gray-400" />
        </Link>
        <div className="h-[1px] w-full bg-gray-200" />
        {/* Preferences */}
        <Link
          to="/settings/preferences"
          className="flex items-center justify-between p-4"
        >
          <div className="flex items-center space-x-3">
            <Cog8ToothIcon className="size-5 stroke-gray-500" />
            <span className="text-base">Preferences</span>
          </div>
          <ChevronRightIcon className="size-5 stroke-gray-400" />
        </Link>
        <div className="h-[1px] w-full bg-gray-200" />
        {/* Changelog */}
        <Link
          to="/settings/changelog"
          className="flex items-center justify-between p-4"
        >
          <div className="flex items-center space-x-3">
            <DocumentTextIcon className="size-5 stroke-gray-500" />

            <span className="text-base">Changelog</span>
            {!user.hasSeenLatestChangelog && (
              <div className="h-2 w-2 rounded-full bg-red-500" />
            )}
          </div>
          <ChevronRightIcon className="size-5 stroke-gray-400" />
        </Link>
        <div className="h-[1px] w-full bg-gray-200" />
        {/* Language */}
        <Link
          to="/settings/language"
          className="flex items-center justify-between p-4"
        >
          <div className="flex items-center space-x-3">
            <LanguageIcon className="size-5 stroke-gray-500" />
            <span className="text-base">Language</span>
          </div>
          <ChevronRightIcon className="size-5 stroke-gray-400" />
        </Link>
      </div>

      {/* Logout */}
      <div className="mx-4 mt-6">
        <button
          onClick={() => logout()}
          className="flex w-full items-center justify-center rounded-lg border border-red-200 bg-white p-4 text-red-600 "
        >
          <div className="flex items-center space-x-3">
            <ArrowLeftStartOnRectangleIcon className="size-5" />
            <span>Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}
