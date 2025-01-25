'use client';

import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import AccountListCard from '@/components/molecules/Cards/AccountListCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import useSendSavingStore from '@/store/useSendSavingStore';
import type { SavingsResponse } from '@/types/Account';
import { TFamily } from '@/types/Family';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type SavingsSectionProps = {
  savings: SavingsResponse | null;
  isLoading: boolean;
};

export default function SavingsSection({
  savings,
  isLoading,
}: SavingsSectionProps) {
  const router = useRouter();
  const [families, setFamilies] = useState<TFamily[]>([]);
  const { getFamilies } = useFamilyApi();
  const { setSelectedSaving } = useSendSavingStore();
  const { toast } = useToast();

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

  const handleCreateSavings = () => {
    if (families.length === 0) {
      toast({ title: '가족을 먼저 등록해주세요' });
      return;
    } else router.push('/savings/create');
  };

  useEffect(() => {
    getFamilies().then((data) => {
      setFamilies(data);
    });
  }, []);

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
        <div onClick={handleCreateSavings}>
          <RegisterCard text='아이 적금 만들기' />
        </div>
      )}
    </div>
  );
}
