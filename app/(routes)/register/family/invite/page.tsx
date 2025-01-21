'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import RegisterCardSmall from '@/components/atoms/Cards/RegisterCardSmall';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import InviteCard from '@/components/molecules/Cards/InviteCard';
import MemberCard from '@/components/molecules/Cards/MemberCard';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import { useUserApi } from '@/hooks/useUserApi/useUserApi';
import useRegisterFamilyStore from '@/store/useRegisterFamilyStore';
import { Child } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const InviteFamily = () => {
  const {
    familyName,
    selectedRole,
    inviteCards,
    addInviteCard,
    updateInviteCard,
    deleteInviteCard,
    selectedChilds,
    setSelectedChilds,
  } = useRegisterFamilyStore();
  const router = useRouter();

  const { setFamily } = useFamilyApi();
  const { getChildren } = useUserApi();

  const [childAccounts, setChildAccounts] = useState<Child[]>([]);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await getChildren();
        setChildAccounts(response);
      } catch (error) {
        console.error('Error fetching child accounts:', error);
      }
    };

    fetchChildren();
  }, []);

  const handleChildAccount = () => {
    router.push('/register/child');
  };

  const isButtonDisabled =
    inviteCards.length === 0 ||
    inviteCards.some((card) => !card.phoneValue || !card.roleValue);

  const handleNextClick = () => {
    const familyData = {
      family_name: familyName,
      role: selectedRole,
      add_members: inviteCards.map((card) => ({
        phone: card.phoneValue,
        role: card.roleValue,
      })),
      add_children: selectedChilds,
    };

    console.log(familyData);

    setFamily(familyData);
    router.push('/register/family/complete');
  };

  return (
    <div>
      <Header title='가족 등록하기' />
      <div className='p-5'>
        <PageTitle
          title={`가족 구성원에게 
초대를 보내주세요`}
          subTitle={`휴대폰이 없는 자녀의 계정은 
부모님께서 생성해주세요`}
        />

        <div className='mt-7 space-y-10'>
          <div className='flex flex-col gap-3'>
            <div className='flex font-medium text-[15px] border-b pb-3'>
              <div className='w-3/5'>전화번호</div>
              <div className='w-2/5'>구성원 역할</div>
            </div>

            {inviteCards.map((card, index) => (
              <InviteCard
                key={index}
                phoneValue={card.phoneValue}
                roleValue={card.roleValue}
                phoneOnchange={(value) =>
                  updateInviteCard(index, { ...card, phoneValue: value })
                }
                roleOnchange={(value) =>
                  updateInviteCard(index, { ...card, roleValue: value })
                }
                onDelete={() => deleteInviteCard(index)}
              />
            ))}

            <RegisterCardSmall
              text='연락처 추가하기'
              onClick={() => addInviteCard({ phoneValue: '', roleValue: '' })}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <div className='font-medium text-[15px] border-b pb-3'>
              자녀 계정 초대하기
            </div>
            <MemberCard
              childs={childAccounts}
              selectedChilds={selectedChilds}
              onSelected={setSelectedChilds}
            />
            <div className='text-center text-darkGray/60 font-medium text-xs'>
              생성된 계정은 부모님이 관리할 수 있어요
            </div>
            <RegisterCardSmall
              text='자녀 계정 추가하기'
              onClick={handleChildAccount}
            />
          </div>
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='다음'
          disabled={isButtonDisabled}
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default InviteFamily;
