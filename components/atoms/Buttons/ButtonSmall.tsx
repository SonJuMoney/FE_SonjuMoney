'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  text: string;
  active: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonSmall = ({
  text,
  active = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex justify-center items-center px-[12px] py-[6px] rounded-lg text-[15px] font-semibold',
        active
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
