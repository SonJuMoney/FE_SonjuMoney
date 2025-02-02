'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CompleteMessage from '@/components/molecules/CompleteMessages/CompleteMessage';
import useSendSavingStore from '@/store/useSendSavingStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CompletePage() {
  const { selectedSaving, resetState } = useSendSavingStore();
  const router = useRouter();

  const handleOnClick = () => {
    resetState();
    router.push('/home');
  };

  return (
    <div className='pageLayout'>
      <Header title='적금 보내기' />
      <div className='defaultLayout'>
        <CompleteMessage
          title={
            <>
              <span className='text-appColor'>{selectedSaving?.user_name}</span>
              님 <br />
              적금이 납입되었어요
            </>
          }
        />
      </div>
      <Link href='/home' className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge onClick={handleOnClick} type='submit' text='확인' />
      </Link>
    </div>
  );
}
