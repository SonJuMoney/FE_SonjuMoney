'use client';

import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import AccountListCard from '@/components/molecules/Cards/AccountListCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import { useSavingApi } from '@/hooks/useSavingApi/useSavingApi';
import useSendSavingStore from '@/store/useSendSavingStore';
import type { SavingsResponse } from '@/types/Account';
import { TFamily } from '@/types/Family';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SavingsSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const { getFamilies } = useFamilyApi();
  const { getSavingsAccounts } = useSavingApi();
  const [families, setFamilies] = useState<TFamily[]>([]);
  const [savings, setSavings] = useState<SavingsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setSelectedSaving } = useSendSavingStore();
  const { toast } = useToast();

  useEffect(() => {
    Promise.all([getFamilies(), getSavingsAccounts()])
      .then(([familiesData, savingsData]) => {
        setFamilies(familiesData);
        setSavings(savingsData);
        setIsLoading(false);
      })
      .catch(() => {
        setSavings(null);
        setIsLoading(false);
      });
  }, [session?.user?.accessToken]);

  const handleSelectAccount = (accountId: number) => {
    setSelectedSaving(
      savings?.savings.find((s) => s.account_id === accountId) ?? null
    );
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

  if (isLoading) {
    return (
      <div className='flex flex-col gap-2.5 font-semibold'>
        <Skeleton className='h-7 w-36' />
        <Skeleton className='h-[120px] w-full rounded-2xl' />
      </div>
    );
  }

  if (savings?.is_child) return null;

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
