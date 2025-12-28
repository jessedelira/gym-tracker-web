import { Show, type ParentProps } from 'solid-js';
import NavigationBar from '../nav/navigation-bar';
import { useAuth } from '../../contexts/auth-context';

export function Layout(props: ParentProps) {
  const { user, isUserLoading } = useAuth();

  return (
    <>
      <Show
        when={user() && !isUserLoading()}
        fallback={
          <div class="flex h-screen flex-col">
            <main class="scrollbar-hide flex-1 overflow-y-auto">
              {props.children}
            </main>
          </div>
        }
      >
        <div class="flex h-screen flex-col">
          {/* Scrollable main content area, pb-19 since that is the height of the navbar */}
          <main class="scrollbar-hide flex-1 overflow-y-auto pb-19">
            {props.children}
          </main>

          {/* Fixed bottom navbar */}
          <nav class="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white">
            <NavigationBar />
          </nav>
        </div>
      </Show>
    </>
  );
}
