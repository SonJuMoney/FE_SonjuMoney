'use client';

import Header from '@/components/atoms/Headers/Header';
import PasswordInput from '@/components/atoms/Inputs/PasswordInput';
import CenterTitle from '@/components/atoms/PageTitles/CenterTitle';
import PasswordForm from '@/components/molecules/Forms/PasswordForm';
import { useAllowanceApi } from '@/hooks/useAllowanceApi/useAllowanceApi';
import { useSavingApi } from '@/hooks/useSavingApi/useSavingApi';
import useSendSavingStore from '@/store/useSendSavingStore';
import { TSavings } from '@/types/Account';
import { TSavingList } from '@/types/Saving';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CheckPinPage = () => {
  const router = useRouter();
  const { selectedSaving, amount, message } = useSendSavingStore();
  const { sendSaving } = useSavingApi();
  const [password, setPassword] = useState<string>('');

  //   const onComplete = async () => {
  //     if (selectedSaving) {
  //       return await sendSaving(selectedSaving, Number(amount), message, );
  //     } else {
  //       return false;
  //     }
  //   };

  useEffect(() => {
    if (password.length !== 6) return;

    const verifySaving = async () => {
      if (!selectedSaving) return false;

      try {
        const result = await sendSaving(
          selectedSaving,
          Number(amount),
          message,
          password
        );

        if (result) router.push('/home');
      } catch (err) {
        if (err == 401) alert('비밀번호 오류');
      } finally {
        setPassword('');
      }
    };

    verifySaving();
  }, [password]);

  return (
    <div className='pageLayout'>
      <Header title='비밀번호 확인' />

      <div className='defaultLayout'>
        <div className='h-full flex flex-col'>
          <div className='h-1/3 flex items-center justify-center'>
            <CenterTitle
              title={`간편비밀번호를 
입력해주세요`}
            />
          </div>

          <div className='flex-1 flex flex-col'>
            <div className='flex justify-center space-x-4 mb-6'>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-[18px] h-[18px] rounded-full ${
                    password.length > i ? 'bg-appColor' : 'bg-disabled'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className='fixed bottom-0 left-0 w-full'>
            <PasswordInput password={password} setPassword={setPassword} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPinPage;
