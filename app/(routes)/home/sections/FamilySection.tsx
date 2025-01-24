'use client';

import FamilyCardLarge from '@/components/atoms/Cards/FamilyCardLarge';
import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import type { TFamily } from '@/types/Family';
import { LuPlus } from 'react-icons/lu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type FamilySectionProps = {
  families: TFamily[] | null;
  isLoading: boolean;
};

export default function FamilySection({
  families,
  isLoading,
}: FamilySectionProps) {
  const router = useRouter();
  const { setSelectedFamily } = useSelectedFamilyStore();

  const colors = ['bg-appColor', 'bg-secondary', 'bg-pink'];

  const handleFamilyClick = (family: TFamily) => {
    setSelectedFamily(family);
    router.push('/feed');
  };

  if (isLoading) {
    return (
      <div className='flex flex-col gap-2.5 font-semibold'>
        <Skeleton className='h-7 w-24' />
        <Skeleton className='h-4 w-48' />
        <div className='overflow-x-auto scrollbar-hide'>
          <div className='flex space-x-4'>
            {[1, 2, 3].map((_, index) => (
              <Skeleton
                key={index}
                className='h-[120px] w-[200px] rounded-2xl'
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2.5 font-semibold '>
      <div className='text-[#272727] text-lg pl-5'>내 가족</div>
      {families ? (
        <>
          <div className='text-[#616161] text-xs pl-5'>
            우리 가족의 소식을 확인해보세요
          </div>
          <div className='overflow-x-auto scrollbar-hide'>
            <div className='flex space-x-4 pl-5'>
              {families.map((family, index) => (
                <div key={family.family_id} className='shrink-0'>
                  <FamilyCardLarge
                    familyName={family.family_name}
                    familyMember={family.members}
                    color={`${colors[index % colors.length]}`}
                    onClick={() => handleFamilyClick(family)}
                  />
                </div>
              ))}
              <div
                onClick={() => router.push('/register/family')}
                className='flex items-center justify-center gap-2.5 bg-white rounded-2xl min-w-[200px] border border-[#eaecef] cursor-pointer'
              >
                <div className='flex items-center justify-center w-5 h-5 rounded-full bg-appColor text-white'>
                  <LuPlus className='w-3 h-3' />
                </div>
                <p className='text-appColor font-medium text-sm'>
                  가족 등록하기
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='text-[#616161] text-xs'>우리 가족을 등록해보세요</div>
          <Link href='/register/family'>
            <RegisterCard text='우리 가족 등록하기' />
          </Link>
        </>
      )}
    </div>
  );
}
