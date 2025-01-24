'use client';

import FamilyCardLarge from '@/components/atoms/Cards/FamilyCardLarge';
import RegisterCard from '@/components/atoms/Cards/RegisterCard';
import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import AccountCard from '@/components/molecules/Cards/AccountCard';
import AccountListCard from '@/components/molecules/Cards/AccountListCard';
import { useAccountApi } from '@/hooks/useAccountApi/useAccountApi';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import useSendSavingStore from '@/store/useSendSavingStore';
import { TAccount, TSavings } from '@/types/Account';
import { TFamily } from '@/types/Family';
import { useSession } from 'next-auth/react';
import { LuPlus } from 'react-icons/lu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = () => {
  const session = useSession();
  // console.log(session);

  const router = useRouter();
  const [account, setAccount] = useState<TAccount | null>(null);
  const [families, setFamilies] = useState<TFamily[] | null>(null);
  const [savings, setSavings] = useState<TSavings[]>([]);
  const { setSelectedFamily } = useSelectedFamilyStore();
  const { setSelectedSaving } = useSendSavingStore();

  const { getMyAccount, getSavingsAccounts } = useAccountApi();
  const { getFamilies } = useFamilyApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountResponse, familiesResponse, savingsResponse] =
          await Promise.all([
            getMyAccount(),
            getFamilies(),
            getSavingsAccounts(),
          ]);
        setAccount(accountResponse);
        setFamilies(familiesResponse);
        setSavings(savingsResponse);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  // 가족 목록
  const familyList = () => {
    const colors = ['bg-appColor', 'bg-secondary', 'bg-pink'];
    const handleClick = (family: TFamily) => {
      setSelectedFamily(family);
      router.push('/feed');
    };

    return (
      <div className='overflow-x-auto'>
        <div className='flex space-x-4'>
          {families?.map((family, index) => (
            <div key={family.family_id} className='shrink-0'>
              <FamilyCardLarge
                familyName={family.family_name}
                familyMember={family.members}
                color={`${colors[index % colors.length]}`}
                onClick={() => handleClick(family)}
              />
            </div>
          ))}
          <div
            onClick={() => router.push('/register/family')}
            className='flex items-center justify-center gap-2.5 bg-white rounded-2xl min-w-[200px] border border-[#eaecef] cursor-pointer'
          >
            <div className='flex items-center justify-center w-5 h-5 rounded-full bg-appColor text-white'>
              <LuPlus className='w-3 h-3' />
            </div>

            <p className='text-appColor font-medium text-sm'>가족 등록하기</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='pageLayout bg-[#FAE4D4]'>
      <LogoHeader showFamily={false} />

      <div className='p-5 flex flex-col gap-5'>
        {/* 내 계좌  */}
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

        {/* 내 가족 */}
        <div className='flex flex-col gap-2.5 font-semibold'>
          <div className='text-[#272727] text-lg'>내 가족</div>

          {families ? (
            familyList()
          ) : (
            <>
              <div className='text-[#616161] text-xs'>
                우리 가족을 등록해보세요
              </div>
              <Link href='/register/family'>
                <RegisterCard text='우리 가족 등록하기' />
              </Link>
            </>
          )}
        </div>

        {/* 적금 */}
        <div className='flex flex-col gap-2.5 font-semibold'>
          <div className='text-[#272727] text-lg'>납입 중인 적금</div>

          {savings && savings.length > 0 ? (
            <AccountListCard
              accounts={savings}
              onSelectAccount={(accountId) => {
                console.log(accountId);
                router.push(`/savings/detail?id=${accountId}`);
              }}
              onButtonClick={(accountId) => {
                setSelectedSaving(
                  savings.find((s) => s.account_id === accountId) ?? null
                );
                router.push('/savings/send');
              }}
              onClick={() => router.push('/savings')}
            />
          ) : (
            <Link href='/savings'>
              <RegisterCard text='아이 적금 만들기' />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
