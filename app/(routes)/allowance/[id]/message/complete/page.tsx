'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CompleteMessage from '@/components/molecules/CompleteMessages/CompleteMessage';
import { useAllowanceApi } from '@/hooks/useAllowanceApi/useAllowanceApi';
import { AllowanceResponse } from '@/types/Allowance';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CompletePage({ params }: { params: { id: string } }) {
  const { getAllowanceData } = useAllowanceApi();
  const [allowanceData, setAllowanceData] = useState<AllowanceResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const fetchAllowanceData = async () => {
        const data = await getAllowanceData(Number(params.id));
        setAllowanceData(data);
        setLoading(false);
      };

      fetchAllowanceData();
    }
  }, [params.id]);

  if (loading) {
    return <div></div>;
  }

  if (!allowanceData) {
    return <div>Data not found</div>;
  }

  return (
    <div className='pageLayout'>
      <Header title='용돈 받기' showBackButton={false} />
      <div className='defaultLayout'>
        <CompleteMessage
          title={
            <>
              <span className='text-appColor'>{allowanceData.sender_name}</span>
              님께 <br />
              마음이 전달되었어요
            </>
          }
          subTitle={`자주 연락하시면 ${allowanceData.sender_name}께서 더 행복합니다😁`}
        />
      </div>
      <Link href='/home' className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge type='submit' text='확인' />
      </Link>
    </div>
  );
}
