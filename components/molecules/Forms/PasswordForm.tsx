'use client';

import PasswordInput from '@/components/atoms/Inputs/PasswordInput';
import CenterTitle from '@/components/atoms/PageTitles/CenterTitle';
import { useToast } from '@/hooks/use-toast';
import { useAuthApi } from '@/hooks/useAuthApi/useAuthApi';
import { useMockAccountApi } from '@/hooks/useMockAccountApi/useMockAccountApi';
import { TPswdReq } from '@/types/Account';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  type: 'Account' | 'Passcode';
  accountId?: number;
  text: string;
  num: number; //비밀번호 자리수
  route: string; // 넘어갈 페이지
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  onComplete: () => Promise<any>;
};

const PasswordForm = ({
  type,
  accountId,
  text,
  num,
  route,
  onComplete,
}: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const { checkPswd } = useMockAccountApi();
  const { checkPassCode } = useAuthApi();

  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const validatePassword = async (password: string): Promise<boolean> => {
    const form: TPswdReq = {
      pin: password,
      ...(type === 'Account' && { mockacc_id: accountId }),
    };

    return type === 'Account' ? checkPswd(form) : checkPassCode(form);
  };

  useEffect(() => {
    if (password.length === num) {
      validatePassword(password)
        .then(() => {
          toast({ title: '인증에 성공하였습니다' });
          onComplete()
            .then(() => {
              router.push(`${route}`);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          if (newAttempts >= 5) {
            toast({
              title: '입력횟수 초과입니다. 가까운 영업점을 방문해주세요.',
            });

            setError(false);
          } else {
            setError(true);
          }
        });
      setPassword('');
    }
  }, [password, attempts, num]);

  return (
    <div className='h-full flex flex-col'>
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

      <div className='fixed bottom-0 left-0 w-full'>
        <PasswordInput password={password} setPassword={setPassword} />
      </div>
    </div>
  );
};

export default PasswordForm;
