import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { LoginForm } from '@/components/molecules/Forms/LoginForm';
import Link from 'next/link';

const Login = () => {
  return (
    <div className='h-screen'>
      <Header title='로그인' showBackButton={false} />
      <div className='p-8 flex flex-col gap-8'>
        <div>
          <PageTitle title='손주머니에' />
          <PageTitle title='오신것을 환영합니다' />
        </div>
        <LoginForm />
        <Link href='/signup' className='w-full text-center text-placeHolder'>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Login;
