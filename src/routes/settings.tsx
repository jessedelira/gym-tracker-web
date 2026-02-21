import { Icon } from 'solid-heroicons';
import { useAuth } from '../contexts/auth-context';
import {
  userCircle,
  chevronRight,
  cog_8Tooth,
  documentText,
  language,
  arrowLeftOnRectangle,
} from 'solid-heroicons/outline';
import { getMonthDDCommaYYYY } from '../utils/date-util';
import { Show } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';
import { api } from '../api/api';

export function Settings() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await api.post('/auth/logout');
    setUser(null);
    navigate('/');
  }

  return (
    <Show when={user()}>
      {(user) => (
        <div class="flex h-full flex-col bg-gray-50 pb-4">
          {/* Profile card */}
          <div class="mx-4 mt-6 rounded-lg border border-gray-200 bg-white p-4">
            <div class="flex items-center space-x-4">
              <div class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
                <Icon path={userCircle} class="size-20 stroke-gray-600" />
              </div>
              <div class="flex flex-col">
                <h1 class="text-lg font-medium text-gray-900">
                  {user().firstName} {user().lastName}
                </h1>
                <p class="text-sm text-gray-500">
                  Member since {getMonthDDCommaYYYY(user().dateCreated)}
                </p>
                {user().username && (
                  <p class="text-sm text-gray-500">@{user().username}</p>
                )}
              </div>
            </div>
          </div>

          {/* Settings list */}
          <div class="mx-4 mt-6 space-y-0.5 rounded-lg border border-gray-200 bg-white">
            {/* Account */}
            <A
              href="/settings/account"
              class="flex items-center justify-between p-4"
            >
              <div class="flex items-center space-x-3">
                <Icon path={userCircle} class="size-5 stroke-gray-500" />
                <span class="text-base">Account</span>
              </div>

              <Icon path={chevronRight} class="size-5 stroke-gray-400" />
            </A>
            <div class="h-px w-full bg-gray-200" />
            {/* Preferences */}
            <A
              href="/settings/preferences"
              class="flex items-center justify-between p-4"
            >
              <div class="flex items-center space-x-3">
                <Icon path={cog_8Tooth} class="size-5 stroke-gray-500" />
                <span class="text-base">Preferences</span>
              </div>
              <Icon path={chevronRight} class="size-5 stroke-gray-400" />
            </A>
            <div class="h-px w-full bg-gray-200" />
            {/* Changelog */}
            <A
              href="/settings/changelog"
              class="flex items-center justify-between p-4"
            >
              <div class="flex items-center space-x-3">
                <Icon path={documentText} class="size-5 stroke-gray-500" />

                <span class="text-base">Changelog</span>
                {!user().hasSeenLatestChangelog && (
                  <div class="h-2 w-2 rounded-full bg-red-500" />
                )}
              </div>
              <Icon path={chevronRight} class="size-5 stroke-gray-400" />
            </A>
            <div class="h-px w-full bg-gray-200" />
            {/* Language */}
            <A
              href="/settings/language"
              class="flex items-center justify-between p-4"
            >
              <div class="flex items-center space-x-3">
                <Icon path={language} class="size-5 stroke-gray-500" />
                <span class="text-base">Language</span>
              </div>
              <Icon path={chevronRight} class="size-5 stroke-gray-400" />
            </A>
          </div>

          {/* Logout */}
          <div class="mx-4 mt-6">
            <button
              onClick={() => logout()}
              class="flex w-full items-center justify-center rounded-lg border border-red-200 bg-white p-4 text-red-600"
            >
              <div class="flex items-center space-x-3">
                <Icon path={arrowLeftOnRectangle} class="size-5" />
                <span>Log Out</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </Show>
  );
}
