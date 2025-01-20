'use client';

import Header from '@/components/atoms/Headers/Header';
import PasswordInput from '@/components/atoms/Inputs/PasswordInput';
import CenterTitle from '@/components/atoms/PageTitles/CenterTitle';
import { useAccountApi } from '@/hooks/useAccountApi/useAccountApi';
import useSavingsAccountStore from '@/store/useSavingsAccountStore';
import { TSetSavingsAccountReq } from '@/types/Account';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SavingsPassword = () => {
  const router = useRouter();
  const { setSavingsAccount } = useAccountApi();
  const {
    selectedChild,
    message,
    isAutoTransfer,
    selectedDate,
    selectedAmount,
    customAmount,
  } = useSavingsAccountStore();
  const [pwd, setPwd] = useState<string>('');

  useEffect(() => {
    const createSavingsAccount = async () => {
      if (pwd.length === 4) {
        if (!selectedChild) {
          return;
        }

        const savingsData: TSetSavingsAccountReq = {
          user_id: selectedChild.user_id,
          message: message,
          account_password: pwd,
          auto_transferable: isAutoTransfer,
          pay_day: Number(selectedDate),
          pay_amount:
            selectedAmount === 'custom' ? Number(customAmount) : selectedAmount,
        };

        try {
          const success = await setSavingsAccount(savingsData);
          if (success) {
            router.push('/savings/complete');
          } else {
            alert('적금 계좌 생성에 실패했습니다.');
          }
        } catch (error) {
          console.error('API Error:', error);
        }
      }
    };

    createSavingsAccount();
  }, [
    customAmount,
    isAutoTransfer,
    message,
    pwd,
    router,
    selectedAmount,
    selectedChild,
    selectedDate,
    setSavingsAccount,
  ]);
  return (
    <div className='pageLayout'>
      <Header title='적금 들어주기' />
      <div className='defaultLayout'>
        <div className='h-1/3 flex items-center justify-center'>
          <CenterTitle
            title={`계좌 비밀번호를
설정해주세요`}
          />
        </div>

        <div className='flex-1 flex flex-col'>
          <div className='flex justify-center space-x-4 mb-6'>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-[18px] h-[18px] rounded-full ${
                  pwd.length > i ? 'bg-appColor' : 'bg-disabled'
                }`}
              />
            ))}
          </div>
        </div>

        <div className='fixed bottom-0 left-0 w-full'>
          <PasswordInput password={pwd} setPassword={setPwd} />
        </div>
      </div>
    </div>
  );
};

export default SavingsPassword;
