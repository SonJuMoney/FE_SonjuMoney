'use client';

import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { useAllowanceApi } from '@/hooks/useAllowanceApi/useAllowanceApi';
import { AllowanceResponse } from '@/types/Allowance';
import { useEffect, useState } from 'react';
import MessageForm from './MessageForm';

export default function MessagePage({ params }: { params: { id: string } }) {
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
      <Header title='용돈 받기' />
      <div>
        <div className='px-4 pt-[25px]'>
          <PageTitle
            title={`${allowanceData.sender_name}님께
마음을 전해주세요`}
          />
        </div>
        <MessageForm
          allowanceId={allowanceData.allowance_id.toString()}
          sender_name={allowanceData.sender_name}
        />
      </div>
    </div>
  );
}
