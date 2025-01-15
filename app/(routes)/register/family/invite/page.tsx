'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import RegisterCardSmall from '@/components/atoms/Cards/RegisterCardSmall';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import InviteCard from '@/components/molecules/Cards/InviteCard';
import useRegisterFamilyStore from '@/store/useRegisterFamilyStore';
import { useRouter } from 'next/navigation';

const InviteFamily = () => {
  const { inviteCards, addInviteCard, updateInviteCard, deleteInviteCard } =
    useRegisterFamilyStore();
  const router = useRouter();

  const handleChildAccount = () => {
    router.push('/register/child');
  };

  const isButtonDisabled =
    inviteCards.length === 0 ||
    inviteCards.some((card) => !card.phoneValue || !card.roleValue);

  const handleNextClick = () => {
    const familyName = useRegisterFamilyStore.getState().familyName;
    const selectedRole = useRegisterFamilyStore.getState().selectedRole;
    const inviteCards = useRegisterFamilyStore.getState().inviteCards;

    // API 전달 추가
    console.log('Family Name:', familyName);
    console.log('Selected Role:', selectedRole);
    console.log('Invite Cards:', inviteCards);
  };

  return (
    <div>
      <Header title='가족 등록하기' />
      <div className='p-5'>
        <PageTitle
          title='가족 구성원에게 초대를 보내주세요'
          subTitle='휴대폰이 없는 자녀의 계정은 부모님께서 생성해주세요'
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
