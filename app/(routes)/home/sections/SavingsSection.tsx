'use client';

import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import AccountListCard from '@/components/molecules/Cards/AccountListCard';
import { Skeleton } from '@/components/ui/skeleton';
import useSendSavingStore from '@/store/useSendSavingStore';
import type { SavingsResponse } from '@/types/Account';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type SavingsSectionProps = {
  savings: SavingsResponse | null;
  isLoading: boolean;
};

export default function SavingsSection({
  savings,
  isLoading,
}: SavingsSectionProps) {
  const router = useRouter();
  const { setSelectedSaving } = useSendSavingStore();

  const handleSelectAccount = (accountId: number) => {
    console.log(accountId);
    router.push(`/savings/detail?id=${accountId}`);
  };

  const handleButtonClick = (accountId: number) => {
    setSelectedSaving(
      savings?.savings.find((s) => s.account_id === accountId) ?? null
    );
    router.push('/savings/send');
  };

  if (isLoading) {
    return (
      <div className='flex flex-col gap-2.5 font-semibold'>
        <Skeleton className='h-7 w-36' />
        <Skeleton className='h-[120px] w-full rounded-2xl' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2.5 font-semibold'>
      <div className='text-[#272727] text-lg'>납입 중인 적금</div>
      {savings && savings.savings.length > 0 ? (
        <AccountListCard
          accounts={savings.savings}
          onSelectAccount={handleSelectAccount}
          onButtonClick={handleButtonClick}
          onClick={() => router.push('/savings')}
        />
      ) : (
        <Link href='/savings'>
          <RegisterCard text='아이 적금 만들기' />
        </Link>
      )}
    </div>
  );
}
