'use client';

import PasswordInput from '@/components/atoms/Inputs/PasswordInput';
import CenterTitle from '@/components/atoms/PageTitles/CenterTitle';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  text: string;
  num: number; //비밀번호 자리수
  correctPassword: string;
  route: string; // 넘어갈 페이지지
};

const PasswordForm = ({ text, num, correctPassword, route }: Props) => {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    if (password.length === num) {
      if (password === correctPassword) {
        alert('인증에 성공하였습니다다');
        router.push(`${route}`);
        setError(false);
        setAttempts(0);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 5) {
          alert('입력횟수 초과입니다. 가까운 영업점을 방문해주세요.');
          setError(false);
        } else {
          setError(true);
        }
      }
      setPassword(''); // Reset password input after each attempt
    }
  }, [password, correctPassword, attempts, num]);

  return (
    <div className='h-[calc(100vh-44px)] flex flex-col'>
      <div className='h-1/3 flex items-center justify-center'>
        <CenterTitle title={text} />
      </div>

      <div className='flex-1 flex flex-col'>
        <div className='flex justify-center space-x-4 mb-6'>
          {[...Array(num)].map((_, i) => (
            <div
              key={i}
              className={`w-[18px] h-[18px] rounded-full ${
                password.length > i ? 'bg-appColor' : 'bg-disabled'
              }`}
            />
          ))}
        </div>
        {error && (
          <div className='text-error text-[15px] font-semibold text-center'>
            비밀번호 오류입니다 ({attempts}/5)
          </div>
        )}
      </div>

      <div className='h-1/3 flex flex-col items-center justify-start'>
        <PasswordInput password={password} setPassword={setPassword} />
      </div>
    </div>
  );
};

export default PasswordForm;
