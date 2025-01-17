'use client';

import ArrowLeft from '@/public/Icons/arrowLeft_20.svg';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
};

export default function Header({
  title = '',
  showBackButton = true,
  onBack,
  actionButton,
  children,
}: HeaderProps) {
  const router = useRouter();
  const handleOnBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <div className='flex flex-row justify-between items-center bg-white px-[20px] py-[12px] h-[48px] relative'>
      {/* 왼쪽: 뒤로 가기 버튼 */}
      <div className='flex h-full w-[44px] items-center'>
        {showBackButton && (
          <button onClick={handleOnBack}>
            <ArrowLeft />
          </button>
        )}
      </div>

      {/* 중앙: 타이틀 */}
      <h1 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-semibold'>
        {title}
      </h1>

      {/* 오른쪽: 액션 버튼 */}
      <div className='text-right'>
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className='text-[15px] font-medium text-black'
          >
            {actionButton.label}
          </button>
        )}
        {children && <>{children}</>}
      </div>
    </div>
  );
}
