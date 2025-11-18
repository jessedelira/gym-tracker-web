import { useState } from 'react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';

interface PasswordInputProps {
  id?: string;
  placeholder?: string;
  isRequired?: boolean;
  setPassword: (value: string) => void;
}

export function PeekPasswordInput({
  id,
  placeholder,
  isRequired,
  setPassword,
}: PasswordInputProps) {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        placeholder={placeholder}
        required={isRequired}
        onChange={(e) => {
          setIsShow(false);
          setPassword(e.target.value);
        }}
        className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 transition-all hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        type={isShow ? 'text' : 'password'}
      />
      <button
        onClick={() => setIsShow(!isShow)}
        className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
        type="button"
      >
        {isShow ? (
          <EyeIcon className="size-6" />
        ) : (
          <EyeSlashIcon className="size-6" />
        )}
      </button>
    </div>
  );
}
