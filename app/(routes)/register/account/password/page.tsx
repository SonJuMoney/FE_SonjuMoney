import Header from '@/components/atoms/Headers/Header';
import PasswordForm from '@/components/molecules/Forms/PasswordForm';

export default async function PasswordPage({
  searchParams,
}: {
  searchParams: { accountId: string };
}) {
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
        />
      </div>
    </div>
  );
}
