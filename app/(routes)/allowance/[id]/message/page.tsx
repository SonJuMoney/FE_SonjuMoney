'use client';

import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { useAllowanceApi } from '@/hooks/useAllowanceApi/useAllowanceApi';
import { AllowanceResponse } from '@/types/Allowance';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MessageForm from './MessageForm';

export default function MessagePage() {
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
