'use client';

import Header from '@/components/atoms/Headers/Header';
import PasswordForm from '@/components/molecules/Forms/PasswordForm';
import { useAllowanceApi } from '@/hooks/useAllowanceApi/useAllowanceApi';
import { TSendAllowanceReq } from '@/types/Allowance';

const EnterPasscode = () => {
  const { sendAllowance } = useAllowanceApi();
  const onComplete = (data: TSendAllowanceReq) => {
    const allowanceData = {
      image: data.image,
      data: {
        to_id: data.data.to_id,
        amount: data.data.amount,
        message: data.data.message,
      },
    };
    return sendAllowance(allowanceData);
  };

  return (
    <div className='pageLayout'>
      <Header title='용돈 보내기' />

      <div className='defaultLayout'>
        <PasswordForm
          type='Passcode'
          text='간편 비밀번호를 입력해주세요'
          num={6}
          route='/allowance/send/complete'
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default EnterPasscode;
