'use client';

import Header from '@/components/atoms/Headers/Header';
import PasswordForm from '@/components/molecules/Forms/PasswordForm';
import { useAccountApi } from '@/hooks/useAccountApi/useAccountApi';
import { TSetAccountReq } from '@/types/Account';

export default function PasswordPage({
  searchParams,
}: {
  searchParams: { accountId: string };
}) {
  const { setAccount } = useAccountApi();
  const onComplete = (data: TSetAccountReq) => {
    const accountData = { mockacc_id: data.mockacc_id, user_id: data.user_id };
    return setAccount(accountData);
  };
  return (
    <div className='pageLayout'>
      <Header title='계좌 등록하기' />
      <div className='defaultLayout'>
        <PasswordForm
          type='Account'
          accountId={Number(searchParams.accountId)}
          text='계좌 비밀번호를 입력해주세요'
          num={4}
          route='/register/account/complete'
          onComplete={onComplete}
        />
      </div>
    </div>
  );
}
