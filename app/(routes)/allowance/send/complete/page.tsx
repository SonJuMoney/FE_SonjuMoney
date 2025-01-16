import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CompleteMessage from '@/components/molecules/CompleteMessages/CompleteMessage';

const SendAllowanceComplete = () => {
  return (
    <div className='pageLayout'>
      <Header title='용돈 보내기' />
      <div className='defaultLayout'>
        <CompleteMessage
          title={
            <>
              <span className='text-appColor'>홍길동님</span>에게
              <br />
              <span className='text-appColor'>30000원</span>을 보냈습니다.
            </>
          }
        />
      </div>
      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='확인' />
      </div>
    </div>
  );
};

export default SendAllowanceComplete;
