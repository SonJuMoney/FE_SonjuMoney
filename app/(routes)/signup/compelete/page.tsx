'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CompletePage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className='flex flex-col justify-center items-center text-lg font-bold'>
      <div>회원가입 완료!</div>
      <div>2초후 홈으로 이동합니다</div>
    </div>
  );
};

export default CompletePage;
