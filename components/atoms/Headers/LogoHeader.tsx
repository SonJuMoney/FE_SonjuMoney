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
import { useState } from 'react';
import { cn } from '@/lib/utils';

type HeaderProps = {
  showFamily: boolean;
};

export default function LogoHeader({ showFamily }: HeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  };

  const families: TFamily[] = [
    {
      family_id: 1,
      family_name: '준용이네 가족',
      members: [
        {
          member_id: 1,
          user_id: 32,
          member_name: '보물1호',
          member_role: '아들',
        },
        {
          member_id: 2,
          user_id: 21,
          member_name: '엄마',
          member_role: '엄마',
        },
        {
          member_id: 3,
          user_id: 3,
          member_name: '딸바보',
          member_role: '아빠',
        },
        {
          member_id: 4,
          user_id: 7,
          member_name: '첫째 딸',
          member_role: '딸',
        },
      ],
    },
    {
      family_id: 2,
      family_name: '유정이네 가족',
      members: [
        {
          member_id: 1,
          user_id: 32,
          member_name: '보물1호',
          member_role: '아들',
        },
        {
          member_id: 2,
          user_id: 21,
          member_name: '엄마',
          member_role: '엄마',
        },
        {
          member_id: 3,
          user_id: 3,
          member_name: '딸바보',
          member_role: '아빠',
        },
        {
          member_id: 4,
          user_id: 7,
          member_name: '첫째 딸',
          member_role: '딸',
        },
      ],
    },
  ];

  const selectedFamily = families[0];

  const [isAlarm, setIsAlarm] = useState<boolean>(false);

  return (
    <div className='flex flex-row justify-between items-center bg-white px-[20px] py-[12px] h-[48px] relative'>
      {/* 왼쪽: 로고 */}
      <div className='flex h-full text-left font-bold text-appColor text-md'>
        손주머니
      </div>

      {/* 중앙: 타이틀 with Popover */}
      {showFamily && families.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <button className='flex items-center h-auto p-0 font-semibold text-[18px] hover:bg-transparent'>
              <span>{selectedFamily.family_name}</span>
              {families?.length > 1 && <ArrowDown className='ml-1' />}
            </button>
          </PopoverTrigger>
          {families?.length > 1 && (
            <PopoverContent className='w-[200px] p-0 '>
              <div className='flex flex-col text-center'>
                {families.map((family) => (
                  <button
                    key={family.family_id}
                    className={cn(
                      'flex w-full items-center justify-center px-4 py-2 font-medium text-[16px]',
                      selectedFamily.family_name === family.family_name
                        ? ' text-appColor'
                        : ''
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
      <div className='text-right flex space-x-4 justify-center items-center'>
        <button onClick={handleSignOut}>LO</button>
        <a href='/alarm'>{isAlarm ? <AlarmOn /> : <AlarmOff />}</a>
      </div>
    </div>
  );
}
