'use client';

import FamilyCardLarge from '@/components/atoms/Cards/FamilyCardLarge';
import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import { Skeleton } from '@/components/ui/skeleton';
// import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import useFamilyQuery from '@/hooks/useFamilyApi/useFamilyQuery';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import type { TFamily } from '@/types/Family';
// import { useSession } from 'next-auth/react';
import { LuPlus } from 'react-icons/lu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// import { useState } from 'react';

export default function FamilySection() {
  const router = useRouter();
  // const { data: session } = useSession();
  const { setSelectedFamily } = useSelectedFamilyStore();
  const { GetFamilyList } = useFamilyQuery();
  const { data: families, isFetching } = GetFamilyList();
  // const [families, setFamilies] = useState<TFamily[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  const colors = ['bg-appColor', 'bg-secondary', 'bg-pink'];

  // useEffect(() => {
  //   getFamilies().then((data) => {
  //     setFamilies(data);
  //     setIsLoading(false);
  //   });
  // }, [session?.user?.accessToken]);

  const handleFamilyClick = (family: TFamily) => {
    setSelectedFamily(family);
    router.push('/feed');
  };

  if (isFetching) {
    return (
      <div className='flex flex-col gap-2.5 font-semibold px-5 '>
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
      {families && families.length > 0 ? (
        <>
          <div className='text-[#616161] text-xs pl-5'>
            우리 가족의 소식을 확인해보세요
          </div>
          <div className='flex w-full'>
            <div className='flex w-full space-x-4 overflow-x-scroll scrollbar-hide px-5'>
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
              <Link
                href='/register/family'
                className='flex items-center justify-center gap-2.5 mr-5 bg-white rounded-2xl min-w-[200px] border border-[#eaecef] cursor-pointer'
              >
                <div className='flex items-center justify-center w-5 h-5 rounded-full bg-appColor text-white'>
                  <LuPlus className='w-3 h-3' />
                </div>
                <p className='text-appColor font-medium text-sm'>
                  가족 등록하기
                </p>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <Link href='/register/family' className='mx-5'>
          <RegisterCard text='가족 등록하기' />
        </Link>
      )}
    </div>
  );
}
