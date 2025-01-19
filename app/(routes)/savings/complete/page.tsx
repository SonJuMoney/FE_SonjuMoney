'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CenterTitle from '@/components/atoms/PageTitles/CenterTitle';
import LoveLetter from '@/public/AnimatedIcons/LoveLetter.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SavingsComplete = () => {
  const router = useRouter();

  const confirm = () => {
    router.push('/home');
  };

  return (
    <div className='pageLayout'>
      <Header title='적금 들어주기' />

      <div className='defaultLayout items-center gap-[50px] mt-20'>
        <CenterTitle
          title={'적금이 가입되었어요'}
          subTitle={'손주의 미래를 위해 좋은 결정을 하셨어요!'}
        />
        <Image src={LoveLetter} alt={'Love Letter'} width={200} height={200} />
      </div>
      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='완료' onClick={confirm} />
      </div>
    </div>
  );
};

export default SavingsComplete;
