'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  text: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonLarge = ({
  text,
  disabled = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex justify-center items-center w-full p-4 rounded-[14px] text-lg',
        disabled
          ? 'bg-disabled text-white cursor-not-allowed'
          : 'bg-appColor text-white',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};
