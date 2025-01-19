'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { useUserApi } from '@/hooks/useUserApi/useUserApi';
import { TProfile } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Summary = () => {
  const router = useRouter();
  const { getUser } = useUserApi();
  const [user, setUser] = useState<TProfile | null>(null);

  const kstOffset = 9 * 60 * 60 * 1000;
  const today = new Date(Date.now() + kstOffset);

  const maturityDate = new Date(today.setMonth(today.getMonth() + 24))
    .toISOString()
    .split('T')[0];

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      setUser(response);
    };

    fetchUser();
  }, []);

  const infomation = [
    { label: '만기일', value: `${maturityDate} (24개월)` },
    { label: '금리', value: '최고 연 3.75%' },
    {
      label: '해지 입금 계좌',
      value: `${user?.username}님 통장`,
    },
  ];

  const onClick = () => {
    router.push('/savings/message');
  };

  return (
    <div className='pageLayout'>
      <Header title='적금 들어주기' />
      <div className='defaultLayout'>
        <PageTitle
          title={`만기일에는 이렇게
이자를 받아요`}
        />

        <div className='flex flex-col gap-4 text-lg font-semibold mt-10'>
          {infomation.map((item, index) => (
            <div key={index} className='flex justify-between'>
              <div>{item.label}</div>
              <div className='text-appColor'>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='다음' onClick={onClick} />
      </div>
    </div>
  );
};

export default Summary;
