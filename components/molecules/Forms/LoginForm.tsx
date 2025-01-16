'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import {
  LabelInput,
  LabelInputRef,
} from '@/components/atoms/Inputs/LabelInput';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useRef, useCallback } from 'react';

export function LoginForm() {
  const userIdRef = useRef<LabelInputRef>(null);
  const passwordRef = useRef<LabelInputRef>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const userId = userIdRef.current?.value;
      const password = passwordRef.current?.value;

      if (!userId || !password) {
        setError('아이디와 비밀번호를 모두 입력해주세요.');
        return;
      }

      console.log('로그인 시도:', { userId, password });
      try {
        const result = await signIn('credentials', {
          userId,
          password,
          redirect: false,
          callbackUrl: '/home',
        });

        console.log('로그인 결과:', result);

        if (result?.ok) {
          router.push('/home');
          router.refresh();
        } else {
          setError('로그인에 실패했습니다.');
          return;
        }
      } catch (error) {
        console.error('로그인 에러:', error);
      }
    },
    [router]
  );

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full gap-8'>
      <LabelInput
        ref={userIdRef}
        label='아이디'
        placeholder='아이디를 입력하세요'
      />
      <LabelInput
        ref={passwordRef}
        label='비밀번호'
        type='password'
        placeholder='비밀번호를 입력하세요'
      />
      {error && <p className='text-error text-sm'>{error}</p>}
      <ButtonLarge text='로그인' type='submit' />
    </form>
  );
}
