import { DelayedNavigation } from '@/components/molecules/DelayedNavigation';
import { auth } from '@/lib/auth';

const CompletePage = async () => {
  const session = await auth();

  return (
    <div className='flex flex-col justify-center items-center text-lg font-bold'>
      <DelayedNavigation session={session} time={3000} />
      <div>회원가입 완료!</div>
      <div>3초후 홈으로 이동합니다</div>
    </div>
  );
};

export default CompletePage;
