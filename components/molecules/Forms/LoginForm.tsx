'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import {
  LabelInput,
  LabelInputRef,
} from '@/components/atoms/Inputs/LabelInput';
import { useState, FormEvent, useRef, useCallback } from 'react';

export function LoginForm() {
  const usernameRef = useRef<LabelInputRef>(null);
  const passwordRef = useRef<LabelInputRef>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }
    // 여기에 로그인 로직을 구현합니다.
    console.log('로그인 시도:', { username, password });
    setError(null);
  }, []);

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full gap-8'>
      <LabelInput
        ref={usernameRef}
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
