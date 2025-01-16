'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import AlarmOff from '@/public/Icons/alarmOff_20.svg';
import AlarmOn from '@/public/Icons/alarmOn_20.svg';
import ArrowDown from '@/public/Icons/arrowDown_20.svg';
import { TFamily } from '@/types/Family';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type HeaderProps = {
  selected?: string;
  familyList?: TFamily[];
  alarm: boolean;
  logout: boolean;
};

export default function LogoHeader({
  selected = '',
  familyList = [],
  alarm,
  logout = false,
}: HeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  };

  return (
    <div className='flex flex-row justify-between items-center bg-white px-[20px] py-[12px] h-[48px] relative'>
      {/* 왼쪽: 로고 */}
      <div className='flex h-full text-left font-bold text-appColor text-md'>
        손주머니
      </div>

      {/* 중앙: 타이틀 with Popover */}
      {selected && (
        <Popover>
          <PopoverTrigger asChild>
            <button className='flex items-center h-auto p-0 font-semibold text-[18px] hover:bg-transparent'>
              <span>{selected}</span>
              {familyList?.length > 1 && <ArrowDown className='ml-1' />}
            </button>
          </PopoverTrigger>
          {familyList?.length > 1 && (
            <PopoverContent className='w-[200px] p-0 '>
              <div className='flex flex-col text-center'>
                {familyList.map((family) => (
                  <button
                    key={family.family_id}
                    className={cn(
                      'flex w-full items-center justify-center px-4 py-2 font-medium text-[16px]',
                      selected === family.family_name ? ' text-appColor' : ''
                    )}
                    onClick={() => {
                      router.push(`/feed/${family.family_id}`);
                    }}
                  >
                    {family.family_name}
                  </button>
                ))}
              </div>
            </PopoverContent>
          )}
        </Popover>
      )}

      {/* 오른쪽: 알람 버튼 */}
      <div className='text-right flex space-x-4'>
        {logout && <button onClick={handleSignOut}>로그아웃</button>}
        <a href='/alarm'>{alarm ? <AlarmOn /> : <AlarmOff />}</a>
      </div>
    </div>
  );
}
