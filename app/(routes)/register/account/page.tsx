'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import AccountList from '@/components/molecules/Lists/AcountList';
import { useMockAccountApi } from '@/hooks/useMockAccountApi/useMockAccountApi';
import { TAccount } from '@/types/Account';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Account = ({ searchParams }: { searchParams: { userId?: number } }) => {
  const { getMockAccounts } = useMockAccountApi();
  const [accountList, setAccountList] = useState<TAccount[]>([]);

  const [selectedAccountId, setSelectedAccountId] = useState<number>();
  const router = useRouter();

  const handleSelect = (accountId: number) => {
    setSelectedAccountId(accountId);
  };

  const handleNext = () => {
    if (selectedAccountId) {
      router.push(`/register/account/password?accountId=${selectedAccountId}`);
    }
  };

  useEffect(() => {
    if (searchParams.userId) {
      const fetchMyAccounts = async () => {
        const response = await getMockAccounts(searchParams.userId);
        setAccountList(response);
      };
      fetchMyAccounts();
    } else {
      const fetchMyAccounts = async () => {
        const response = await getMockAccounts();
        setAccountList(response);
      };
      fetchMyAccounts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='pageLayout'>
      <Header title='계좌 등록하기' />
      <div className='defaultLayout'>
        <div className='flex flex-col gap-4'>
          <PageTitle
            title={`등록할 계좌 1개를 
선택해주세요`}
            subTitle='입출금 계좌만 등록할 수 있어요'
          />
          <AccountList
            accounts={accountList}
            onSelectAccount={handleSelect}
            selectedAccount={selectedAccountId}
          />
        </div>

        <div className='fixed bottom-0 left-0 w-full p-5'>
          <ButtonLarge
            text='다음'
            disabled={!selectedAccountId}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
