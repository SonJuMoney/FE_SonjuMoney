'use client';

import PasswordInput from '@/components/atoms/Inputs/PasswordInput';
import CenterTitle from '@/components/atoms/PageTitles/CenterTitle';
import useSignUpStore, { SignUpData } from '@/store/useSignupStore';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const SetPinPage = () => {
  const router = useRouter();
  const signUpData: SignUpData | null = useSignUpStore(
    (state) => state.signUpData
  );
  const [password, setPassword] = useState<string>('');

  const handleSignUp = useCallback(
    async (pin: string) => {
      if (pin.length !== 6) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              auth_id: signUpData?.id,
              password: signUpData?.password,
              name: signUpData?.name,
              phone: signUpData?.phone,
              resident_num: signUpData?.residentNum,
              pin: pin,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('회원가입 요청 실패');
        }

        const data = await response.json();

        if (data.code === 201) {
          alert('회원가입 성공');
          router.push('/login');
        } else {
          throw new Error('회원가입 응답 코드 오류');
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
        alert('회원가입 중 오류가 발생했습니다.');
        router.push('/signup');
      }
    },
    [signUpData, router]
  );

  useEffect(() => {
    if (!signUpData) {
      alert('회원가입 정보가 없습니다');
      router.push('/signup');
      return;
    }

    if (password.length === 6) {
      handleSignUp(password);
    }
  }, [password, handleSignUp, signUpData, router]);

  return (
    <div className='h-full flex flex-col'>
      <div className='h-1/3 flex items-center justify-center'>
        <CenterTitle title='간편 비밀번호를 설정해주세요요' />
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
  );
};

export default SetPinPage;
