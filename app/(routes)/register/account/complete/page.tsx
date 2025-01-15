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
          subTitle='손주에게 용돈을 보내보세요!'
        />
      </div>
      <Link href='/' className='fixed bottom-0 left-0 w-full  p-4 '>
        <ButtonLarge text='완료' />
      </Link>
    </div>
  );
};

export default page;
