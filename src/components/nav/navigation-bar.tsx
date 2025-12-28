import { A, useLocation } from '@solidjs/router';
import { Icon } from 'solid-heroicons';
import { cog_8Tooth, home, squaresPlus } from 'solid-heroicons/outline';

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
    <div class="mx-auto flex h-full max-w-md items-center justify-around border-t border-gray-200 bg-white pb-4">
      {/* Home */}
      <A
        href="/home"
        class={`flex flex-col items-center px-6 py-2 ${
          currentURL() === 'home' ? 'text-black' : 'text-gray-500'
        }`}
      >
        <Icon
          path={home}
          class={`size-6 ${currentURL() === 'home' ? 'stroke-black' : ''}`}
        />
        <span class="mt-1 text-xs font-medium">Home</span>
      </A>

      {/* Manage */}
      <A
        href="/training"
        class={`flex flex-col items-center px-6 py-2 ${
          currentURL() === 'training' ? 'text-black' : 'text-gray-500'
        }`}
      >
        <Icon
          path={squaresPlus}
          class={`size-6 ${currentURL() === 'training' ? 'stroke-black' : ''}`}
        />

        <span class="mt-1 text-xs font-medium">Manage</span>
      </A>

      {/* Settings */}
      <A
        href="/settings"
        class={`relative flex flex-col items-center px-6 py-2 ${
          currentURL() === 'settings' ? 'text-black' : 'text-gray-500'
        }`}
      >
        {/* Red notification dot */}
        <div class="absolute top-1 right-4 h-2 w-2 rounded-full bg-red-500" />

        <Icon
          path={cog_8Tooth}
          class={`size-6 ${currentURL() === 'settings' ? 'stroke-black' : ''}`}
        />

        <span class="mt-1 text-xs font-medium">Settings</span>
      </A>
    </div>
  );
}
