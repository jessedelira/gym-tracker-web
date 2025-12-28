import { Navigate } from '@solidjs/router';
import type { ParentProps } from 'solid-js';
import { Show } from 'solid-js';
import { useAuth } from '../../contexts/auth-context';
import { LoadingSpinner } from '../loading-spinner';

export function Protected(props: ParentProps) {
  const { user, isUserLoading } = useAuth();

  return (
    <Show when={!isUserLoading()} fallback={<LoadingSpinner />}>
      <Show when={user()} fallback={<Navigate href="/login" />}>
        {props.children}
      </Show>
    </Show>
  );
}
