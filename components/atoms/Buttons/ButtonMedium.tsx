'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  text: string;
  selected: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonMedium = ({
  text,
  selected = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex justify-center items-center w-full p-[11px] rounded-lg font-semibold',
        selected
          ? 'text-appColor border border-appColor'
          : 'text-placeHolder border border-disabled',
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
};
