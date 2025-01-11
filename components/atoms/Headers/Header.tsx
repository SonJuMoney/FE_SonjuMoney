'use client';

import ArrowLeft from '@/assets/Icons/arrowLeft_20.svg';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
};

export default function Header({
  title = '',
  showBackButton = true,
  onBack,
  actionButton,
}: HeaderProps) {
  const router = useRouter();
  const handleOnBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <div className='flex justify-between items-center bg-white px-[20px] py-[12px] h-[44px] relative'>
      {/* 왼쪽: 뒤로 가기 버튼 */}
      <div className='w-[44px]'>
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
      <div className='w-[44px] text-right'>
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className='text-[18px] font-medium text-black'
          >
            {actionButton.label}
          </button>
        )}
      </div>
    </div>
  );
}
