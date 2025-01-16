import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';

const SendAllowanceComplete = () => {
  return (
    <div>
      <Header title='용돈 보내기' />

      <div className='p-5'>홍길동님에게 30000원을 보냈습니다.</div>
      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='확인' />
      </div>
    </div>
  );
};

export default SendAllowanceComplete;
