'use client';

import AlarmOff from '@/assets/Icons/alarmOff_20.svg';
import AlarmOn from '@/assets/Icons/alarmOn_20.svg';
import ArrowDown from '@/assets/Icons/arrowDown_20.svg';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Family } from '@/types/Family';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type HeaderProps = {
  selected?: string;
  familyList?: Family[];
  alarm: boolean;
};

export default function LogoHeader({
  selected = '',
  familyList = [],
  alarm,
}: HeaderProps) {
  const router = useRouter();

  return (
    <div className='flex justify-between items-center bg-white px-[20px] py-[12px] h-[44px] relative'>
      {/* 왼쪽: 로고 */}
      <div className='text-left'>logo</div>

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
      <div className='text-right'>
        <a href='/alarm'>{alarm ? <AlarmOn /> : <AlarmOff />}</a>
      </div>
    </div>
  );
}
