'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ text, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'flex justify-center items-center w-full h-10 p-4 rounded-lg text-[15px] font-semibold bg-[#eff0f4]',
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
};
