'use client';

import AddIcon from '@/public/Icons/add_18.svg';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AddButtonProps = {
  itemCnt: number;
  maxCnt: number;
  onClick: () => void;
  size?: number;
  children?: ReactNode;
  className?: string;
};

export default function AddPhotoButton({
  itemCnt,
  maxCnt,
  onClick,
  size = 150,
  children,
  className,
}: AddButtonProps) {
  const sizeStyle = size ? `${size}px` : '150px';

  return (
    <button
      onClick={onClick}
      style={{ width: sizeStyle, height: sizeStyle }}
      className={cn(
        'flex-shrink-0 flex flex-col justify-center items-center ',
        'border border-disabled rounded-lg bg-white',
        'text-[15px] font-normal text-placeHolder',
        className
      )}
    >
      <AddIcon className='w-[18px] h-[18px]' />
      <span>
        ({itemCnt}/{maxCnt})
      </span>
      {children}
    </button>
  );
}
