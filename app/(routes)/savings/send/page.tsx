'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PriceInput from '@/components/atoms/Inputs/PriceInput';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { useAccountApi } from '@/hooks/useAccountApi/useAccountApi';
import { useSavingApi } from '@/hooks/useSavingApi/useSavingApi';
import useSendSavingStore from '@/store/useSendSavingStore';
import { MyAccount } from '@/types/Account';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SendPage = () => {
  const { selectedSaving, setAmount } = useSendSavingStore();
  const [localAmount, setLocalAmount] = useState('');
  const [account, setAccount] = useState<MyAccount | null>(null);
  const [limitAmount, setLimitAmount] = useState<number>();
  const router = useRouter();

  const { getMyAccount } = useAccountApi();
  const { getSavingLimit } = useSavingApi();

  useEffect(() => {
    const fetchAccount = async () => {
      const response = await getMyAccount();
      setAccount(response);
    };

    const fetchLimit = async () => {
      if (!selectedSaving) return;

      const response = await getSavingLimit(selectedSaving?.account_id);
      setLimitAmount(response.month_available_amount);
    };

    fetchAccount();
    fetchLimit();
  }, []);

  const handleNextStep = () => {
    setAmount(Number(localAmount));
    router.push(`/savings/send/message`);
  };

  if (!account) return <div></div>;

  return (
    <div>
      <Header title='적금 보내기' />
      <div className='p-5 space-y-6'>
        <div className='flex flex-col gap-1'>
          <PageTitle title={`내 ${account.account_name} 계좌에서`} />
          <div className='text-[13px] font-semibold'>
            잔액 {account.balance.toLocaleString()}원
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <PageTitle
            title={
              <>
                <span className='text-appColor'>
                  {selectedSaving?.user_name}
                </span>
                님 계좌로
              </>
            }
          />
          <div className='text-[13px] font-semibold'>
            {'하나'} {selectedSaving?.account_num}
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <PriceInput
            value={localAmount}
            onChange={setLocalAmount}
            balance={account.balance}
            limitAmount={limitAmount}
          />
          {!localAmount && (
            <div className='text-sm'>
              납입 한도 금액은{' '}
              <span className='text-appColor'>
                {limitAmount?.toLocaleString()}
              </span>
              원입니다.
            </div>
          )}
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='다음'
          disabled={
            !localAmount ||
            localAmount === '0' ||
            Number(localAmount) > account.balance ||
            Number(localAmount) > (limitAmount ?? 0)
          }
          onClick={handleNextStep}
        />
      </div>
    </div>
  );
};

export default SendPage;
