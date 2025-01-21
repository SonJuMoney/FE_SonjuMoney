'use client';

import Header from '@/components/atoms/Headers/Header';
import PasswordForm from '@/components/molecules/Forms/PasswordForm';
import { useAccountApi } from '@/hooks/useAccountApi/useAccountApi';
import { TSetAccountReq } from '@/types/Account';

export default function PasswordPage({
  searchParams,
}: {
  searchParams: { accountId: string; childId: string };
}) {
  const { setAccount } = useAccountApi();
  const childId = Number(searchParams.childId);
  const handleOnComplete = () => {
    const data: TSetAccountReq =
      childId === 0
        ? { mockacc_id: Number(searchParams.accountId) }
        : { mockacc_id: Number(searchParams.accountId), user_id: childId };
    return setAccount(data);
  };
  return (
    <div className='pageLayout'>
      <Header title='계좌 등록하기' />
      <div className='defaultLayout'>
        <PasswordForm
          type='Account'
          accountId={Number(searchParams.accountId)}
          text={`계좌 비밀번호를 
입력해주세요`}
          num={4}
          route={
            childId === 0
              ? '/register/account/complete'
              : '/register/family/invite'
          }
          onComplete={handleOnComplete}
        />
      </div>
    </div>
  );
}
