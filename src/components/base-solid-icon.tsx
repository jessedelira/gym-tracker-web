import type { ReactNode } from 'react';

interface BaseSolidIconProps {
  children: ReactNode;
  size?: number;
  color?: string;
}

export function BaseSolidIcon({
  children,
  size = 5, // 5*4 = 20 px → Heroicons solid default
  color = 'currentColor',
}: BaseSolidIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={`${size * 4}px`}
      height={`${size * 4}px`}
      fill={color}
    >
      {children}
    </svg>
  );
}
