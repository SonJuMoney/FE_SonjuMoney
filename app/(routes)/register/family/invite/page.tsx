'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import RegisterCardSmall from '@/components/atoms/Cards/RegisterCardSmall';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import InviteCard from '@/components/molecules/Cards/InviteCard';
import { Role } from '@/types/User';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const InviteFamily = () => {
  const [inviteCards, setInviteCards] = useState<
    { phoneValue: string; roleValue: Role }[]
  >([]);
  const router = useRouter();

  const handlePhoneChange = (index: number, value: string) => {
    setInviteCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, phoneValue: value } : card
      )
    );
  };

  const handleRoleChange = (index: number, value: Role) => {
    setInviteCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, roleValue: value } : card
      )
    );
  };

  const handleDelete = (index: number) => {
    setInviteCards((prevCards) => prevCards.filter((_, i) => i !== index));
  };

  const handleAddPhone = () => {
    setInviteCards((prevCards) => [
      ...prevCards,
      { phoneValue: '', roleValue: '' },
    ]);
  };

  const handleChildAccount = () => {
    router.push('/register/child');
  };

  const isButtonDisabled =
    inviteCards.length === 0 ||
    inviteCards.some((card) => !card.phoneValue || !card.roleValue);

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
                phoneOnchange={(value) => handlePhoneChange(index, value)}
                roleOnchange={(value) => handleRoleChange(index, value)}
                onDelete={() => handleDelete(index)}
              />
            ))}

            <RegisterCardSmall
              text='연락처 추가하기'
              onClick={handleAddPhone}
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
          onClick={() => console.log(inviteCards)} // handleOnClick 추가
        />
      </div>
    </div>
  );
};

export default InviteFamily;
