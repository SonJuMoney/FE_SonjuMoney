'use client';

import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <LogoHeader alarm={false} logout={true} />

      <div className='p-5 space-y-5'>
        <div className='flex flex-col gap-2.5 font-semibold'>
          <div className='text-[#272727] text-lg'>내 계좌</div>
          <div className='text-[#616161] text-xs'>등록된 계좌가 없어요</div>
          <RegisterCard text='내 계좌 연결하기' />
        </div>

        <div className='flex flex-col gap-2.5 font-semibold'>
          <div className='text-[#272727] text-lg'>내 가족</div>
          <div className='text-[#616161] text-xs'>우리 가족을 등록해보세요</div>
          <Link href='/register/family'>
            <RegisterCard text='우리 가족 등록하기' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
