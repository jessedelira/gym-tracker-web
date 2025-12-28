import { createSignal, Setter } from 'solid-js';
import { Icon } from 'solid-heroicons';
import { eyeSlash, eye } from 'solid-heroicons/outline';

interface PasswordInputProps {
  id?: string;
  placeholder?: string;
  isRequired?: boolean;
  setPassword: Setter<string>;
}

export function PeekPasswordInput(props: PasswordInputProps) {
  const [isShow, setIsShow] = createSignal(false);

  return (
    <div class="relative">
      <input
        id={props.id}
        placeholder={props.placeholder}
        required={props.isRequired}
        onInput={(e) => {
          setIsShow(false);
          props.setPassword(e.currentTarget.value);
        }}
        class="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        type={isShow() ? 'text' : 'password'}
      />
      <button
        onClick={() => setIsShow(!isShow())}
        class="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-500"
        type="button"
      >
        {isShow() ? (
          <Icon path={eye} class="size-6" />
        ) : (
          <Icon path={eyeSlash} class="size-6" />
        )}
      </button>
    </div>
  );
}
