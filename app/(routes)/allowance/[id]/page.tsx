'use client';

import Header from '@/components/atoms/Headers/Header';
import { useAllowanceApi } from '@/hooks/useAllowanceApi/useAllowanceApi';
import type { AllowanceResponse } from '@/types/Allowance';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

export default function AllowancePage() {
  const { id } = useParams();
  const { getAllowanceData } = useAllowanceApi();
  const [allowanceData, setAllowanceData] = useState<AllowanceResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchAllowanceData = async () => {
        const data = await getAllowanceData(Number(id));
        setAllowanceData(data);
        setLoading(false);
      };

      fetchAllowanceData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!allowanceData) {
    return <div>Data not found</div>;
  }

  return (
    <div className='pageLayout'>
      <Header title='용돈 받기'>
        <Link href='/home'>
          <span className='text-appColor'>건너뛰기 </span>
        </Link>
      </Header>

      <div className='defaultLayout items-center justify-center gap-10'>
        <div className='flex flex-col w-full items-center'>
          <div className='flex justify-center items-center w-32 h-32 rounded-full bg-secondary bg-opacity-20 mb-4 '>
            <Image
              src='/Role1.png'
              alt='Profile'
              width={96}
              height={96}
              className='rounded-full '
            />
          </div>
          <h2 className='text-xl font-medium text-center mb-8'>
            <span className='text-orange-500 font-semibold'>
              {allowanceData.sender_name}
            </span>
            님께서
            <br />
            <span className='text-orange-500 font-semibold'>
              {allowanceData.amount.toLocaleString()}원
            </span>
            을 보내셨어요.
          </h2>
        </div>

        <div className='flex flex-col w-full max-w-md gap-4'>
          <Link
            href={`/allowance/${id}/message`}
            className='block p-4 bg-white rounded-lg border border-gray-200 shadow-sm'
          >
            <div className='flex items-center justify-center space-x-2'>
              <span className='text-2xl'>🎂</span>
              <span className='font-semibold text-xl'>사진/영상 보내기</span>
            </div>
          </Link>

          <button className='w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm'>
            <div className='flex items-center justify-center space-x-2'>
              <span className='text-2xl'>🎂</span>
              <span className='font-semibold text-xl'>화상통화하기</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
