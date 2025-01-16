'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PriceInput from '@/components/atoms/Inputs/PriceInput';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const EnterAmount = () => {
  const [amount, setAmount] = useState('');
  const router = useRouter();

  const handleNextStep = () => {
    router.push(`/allowance/send/password`);
  };

  return (
    <div>
      <Header title='용돈 보내기' />
      <div className='p-5'>
        <div>내 나라사랑 계좌에서</div>
        <PriceInput value={amount} onChange={setAmount} />
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='다음'
          disabled={!amount || amount === '0'}
          onClick={handleNextStep}
        />
      </div>
    </div>
  );
};

export default EnterAmount;
