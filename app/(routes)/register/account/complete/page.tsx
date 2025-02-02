import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CompleteMessage from '@/components/molecules/CompleteMessages/CompleteMessage';
import Link from 'next/link';

const page = () => {
  return (
    <div className='pageLayout'>
      <Header title='계좌 등록하기' showBackButton={false} />
      <div className='defaultLayout'>
        <CompleteMessage
          title='계좌가 등록되었어요'
          subTitle='손주머니에서 소식을 나눠보아요!'
        />
      </div>
      <Link href='/home' className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='완료' />
      </Link>
    </div>
  );
};

export default page;
