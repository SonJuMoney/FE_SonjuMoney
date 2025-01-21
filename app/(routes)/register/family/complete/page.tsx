'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CenterTitle from '@/components/atoms/PageTitles/CenterTitle';
import LoveLetter from '@/public/AnimatedIcons/LoveLetter.png';
import useRegisterFamilyStore from '@/store/useRegisterFamilyStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const RegisterFamilyComplete = () => {
  const { resetState } = useRegisterFamilyStore();
  const router = useRouter();

  const confirm = () => {
    resetState();
    router.push('/home');
  };

  return (
    <div className='pageLayout'>
      <Header title='가족 등록하기' showBackButton={false} />

      <div className='defaultLayout items-center gap-[50px] mt-20'>
        <CenterTitle
          title={'초대가 전송되었어요'}
          subTitle={'앱 내 알림, 카카오톡 메세지로 전송되었어요'}
        />
        <Image src={LoveLetter} alt={'Love Letter'} width={200} height={200} />
      </div>
      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='완료' onClick={confirm} />
      </div>
    </div>
  );
};

export default RegisterFamilyComplete;
