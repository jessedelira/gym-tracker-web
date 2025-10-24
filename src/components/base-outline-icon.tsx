import type { ReactNode } from 'react';

interface BaseOutlineIconProps {
  children: ReactNode;
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export function BaseOutlineIcon({
  children,
  size = 6, // 6*4 = 24 px → Heroicons outline default
  strokeColor = 'currentColor',
  strokeWidth = 1.5,
}: BaseOutlineIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={`${size * 4}px`}
      height={`${size * 4}px`}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
    >
      {children}
    </svg>
  );
}
