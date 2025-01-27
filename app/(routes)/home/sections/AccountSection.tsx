'use client';

import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import AccountCard from '@/components/molecules/Cards/AccountCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useAccountApi } from '@/hooks/useAccountApi/useAccountApi';
import type { TAccount } from '@/types/Account';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountSection() {
  const { data: session } = useSession();
  const router = useRouter();
  const { getMyAccount } = useAccountApi();
  const [account, setAccount] = useState<TAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMyAccount().then((data) => {
      setAccount(data);
      setIsLoading(false);
    });
  }, [session?.user?.accessToken]);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-2.5 font-semibold'>
        <Skeleton className='h-7 w-24' />
        <Skeleton className='h-[72px] w-full rounded-2xl' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2.5 font-semibold'>
      <div className='text-[#272727] text-lg'>내 계좌</div>
      {account ? (
        <AccountCard
          accountName={account.account_name}
          accountBalance={account.balance}
          onClick={() => router.push('/allowance/send')}
        />
      ) : (
        <>
          <div className='text-[#616161] text-xs'>등록된 계좌가 없어요</div>
          <Link href='/register/account'>
            <RegisterCard text='내 계좌 연결하기' />
          </Link>
        </>
      )}
    </div>
  );
}
