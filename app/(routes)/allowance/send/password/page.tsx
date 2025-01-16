'use client';

import Header from '@/components/atoms/Headers/Header';
import PasswordForm from '@/components/molecules/Forms/PasswordForm';
import { useApi } from '@/hooks/useApi';
import { TSetAccountReq } from '@/types/Account';

const EnterPasscode = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/';

  const onComplete = async (data: TSetAccountReq) => {
    const accountData = { mockacc_id: data.mockacc_id, user_id: data.user_id };

    const setAccount = async (
      accountData: TSetAccountReq
    ): Promise<boolean> => {
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(accountData),
      };
      const response = await fetchApi(`${baseUrl}`, options);

      return response.code === 200;
    };

    return setAccount(accountData);
  };

  return (
    <div className='pageLayout'>
      <Header title='용돈 보내기' />

      <div className='defaultLayout'>
        <PasswordForm
          type='Passcode'
          // accountId={}
          text='간편 비밀번호를 입력해주세요'
          num={6}
          route='/allowance/send/response'
          onComplete={onComplete}
        />
      </div>
    </div>
  );
};

export default EnterPasscode;
