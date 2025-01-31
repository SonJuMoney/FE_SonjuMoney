'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CompleteMessage from '@/components/molecules/CompleteMessages/CompleteMessage';
import useSendAllowanceStore from '@/store/useSendAllowanceStore';
import { useRouter } from 'next/navigation';

const SendAllowanceComplete = () => {
  const { selectedMember, amount, message, resetState } =
    useSendAllowanceStore();
  const router = useRouter();

  const handleConfirm = () => {
    resetState();

    router.push('/home');
  };

  return (
    <div className='pageLayout'>
      <Header title='용돈 보내기' />
      <div className='defaultLayout'>
        <CompleteMessage
          title={
            <>
              <span className='text-appColor'>
                {selectedMember?.member_name}
              </span>
              님에게
              <br />
              <span className='text-appColor'>
                {Number(amount).toLocaleString()}원
              </span>
              {message ? <>과 메시지를 보냈습니다.</> : <>을 보냈습니다.</>}
            </>
          }
        />
      </div>
      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='확인' onClick={handleConfirm} />
      </div>
    </div>
  );
};

export default SendAllowanceComplete;
