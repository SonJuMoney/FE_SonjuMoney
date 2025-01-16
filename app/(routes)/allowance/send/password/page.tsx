'use client';

import Header from '@/components/atoms/Headers/Header';

// import PasswordForm from '@/components/molecules/Forms/PasswordForm';

const EnterPasscode = () => {
  return (
    <div className='pageLayout'>
      <Header title='용돈 보내기' />

      <div className='defaultLayout'>
        {/* <PasswordForm
          type='Passcode'
          // accountId={}
          text='간편 비밀번호를 입력해주세요'
          num={6}
          route='/allowance/send/response'
          onComplete={onComplete}
        /> */}
      </div>
    </div>
  );
};

export default EnterPasscode;
