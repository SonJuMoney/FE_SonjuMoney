'use client';

import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='pageLayout bg-pageBg'>
      <LogoHeader showFamily={false} />

      <div className='p-5 flex flex-col gap-5'>
        <Link href='/register/account'>
          <div className='flex flex-col gap-2.5 font-semibold'>
            <div className='text-[#272727] text-lg'>내 계좌</div>
            <div className='text-[#616161] text-xs'>등록된 계좌가 없어요</div>
            <RegisterCard text='내 계좌 연결하기' />
          </div>
        </Link>
        <Link href='/register/family'>
          <div className='flex flex-col gap-2.5 font-semibold'>
            <div className='text-[#272727] text-lg'>내 가족</div>
            <div className='text-[#616161] text-xs'>
              우리 가족을 등록해보세요
            </div>

            <RegisterCard text='우리 가족 등록하기' />
          </div>
        </Link>
        <Link href='/savings'>
          <div className='flex flex-col gap-2.5 font-semibold'>
            <div className='text-[#272727] text-lg'>납입 중인 적금</div>
            <RegisterCard text='아이 적금 만들기' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
