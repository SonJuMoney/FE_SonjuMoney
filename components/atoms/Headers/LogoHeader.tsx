'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useAlarmQuery from '@/hooks/useAlarmApi/useAlarmQuery';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import AlarmOff from '@/public/Icons/alarmOff_20.svg';
import AlarmOn from '@/public/Icons/alarmOn_20.svg';
import ArrowDown from '@/public/Icons/arrowDown_20.svg';
import Logo from '@/public/Logo/Logo_Header.svg';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { TFamily } from '@/types/Family';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import ProfileButton from '../Buttons/ProfileButton';

type HeaderProps = {
  showFamily: boolean;
};

export default function LogoHeader({ showFamily }: HeaderProps) {
  const router = useRouter();
  const { getFamilies } = useFamilyApi();
  const { GetAlarmStatus } = useAlarmQuery();
  const { data } = GetAlarmStatus();
  const [families, setFamilies] = useState<TFamily[]>([]);
  const {
    selectedFamily,
    setSelectedFamily,
    hydrated,
    setHydrated,
    setfamilyList,
  } = useSelectedFamilyStore();
  const [open, setOpen] = useState(false);

  const selectedFamilyName =
    selectedFamily?.family_name ||
    (families.length > 0 ? families[0].family_name : '');

  useEffect(() => {
    useSelectedFamilyStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  useEffect(() => {
    const fetchFamilies = async () => {
      const response = await getFamilies();
      setFamilies(response);

      if (!selectedFamily && response.length > 0) {
        setSelectedFamily(response[0]);
        setfamilyList(response);
      }
    };

    if (hydrated) {
      fetchFamilies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const handleSelect = (family: TFamily) => {
    setSelectedFamily(family);
    setOpen(false);
  };

  return (
    <div className='flex flex-row justify-between items-center bg-transparent  px-[20px] py-[12px] h-[48px] relative  w-full'>
      {/* 왼쪽: 로고 */}
      <div
        className='flex  text-left font-bold text-appColor text-lg gap-1 items-center justify-center'
        onClick={() => router.push('/home')}
      >
        <Logo />
        <span>손주머니</span>
      </div>

      {/* 중앙: 타이틀 with Popover */}
      {showFamily && families.length > 0 && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className='flex items-center h-auto p-0 font-semibold text-[18px] hover:bg-transparent'>
              <span>{selectedFamilyName}</span>
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
                      selectedFamily?.family_id === family.family_id
                        ? ' text-appColor'
                        : ''
                    )}
                    onClick={() => handleSelect(family)}
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
      <div className='text-right flex gap-2 justify-center items-center'>
        <ProfileButton />
        <a href='/alarm'>{data?.is_exist ? <AlarmOn /> : <AlarmOff />}</a>
      </div>
    </div>
  );
}
