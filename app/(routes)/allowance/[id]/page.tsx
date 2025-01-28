'use client';

import Header from '@/components/atoms/Headers/Header';
import { useToast } from '@/hooks/use-toast';
import { useAllowanceApi } from '@/hooks/useAllowanceApi/useAllowanceApi';
import type { AllowanceResponse } from '@/types/Allowance';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createMeeting } from '@/lib/call';

export default function AllowancePage({ params }: { params: { id: string } }) {
  const { getAllowanceData } = useAllowanceApi();
  const [allowanceData, setAllowanceData] = useState<AllowanceResponse | null>(
    null
  );
  const { data: session } = useSession();
  const client = useStreamVideoClient();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (params.id) {
      const fetchAllowanceData = async () => {
        const data = await getAllowanceData(Number(params.id));
        setAllowanceData(data);
        setLoading(false);
      };

      fetchAllowanceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleCreateMeeting = async () => {
    if (!client || !session?.user?.userId || !allowanceData) return;

    try {
      const callId = await createMeeting({
        client,
        userId: session.user.userId.toString(),
        calleeId: allowanceData.sender_id.toString(),
        description: '용돈 감사 통화',
      });

      router.push(`/call/${callId}`);
    } catch (error) {
      console.error(error);
      toast({ title: '화상통화 연결에 실패했습니다.' });
    }
  };

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
              width={96}
              height={96}
              src={
                allowanceData.sender_profile
                  ? `${allowanceData.sender_profile}`
                  : '/Default_Profile.svg'
              }
              alt='userImage'
              className='rounded-full object-cover w-full h-full'
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
            href={`/allowance/${params.id}/message`}
            className='block p-4 bg-white rounded-lg border border-gray-200 shadow-sm'
          >
            <div className='flex items-center justify-center space-x-2'>
              <Image
                src={'/AnimatedIcons/Camera.png'}
                width={40}
                height={40}
                alt='Alarm Icon'
              />
              <span className='font-semibold text-xl'>사진/영상 보내기</span>
            </div>
          </Link>

          <button
            className='w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm'
            onClick={handleCreateMeeting}
          >
            <div className='flex items-center justify-center space-x-2'>
              <Image
                src={'/AnimatedIcons/Call.png'}
                width={40}
                height={40}
                alt='Alarm Icon'
              />
              <span className='font-semibold text-xl'>화상통화하기</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
