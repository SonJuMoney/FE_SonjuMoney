import { DelayedNavigation } from '@/components/molecules/DelayedNavigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className='h-screen flex flex-col justify-center items-center space-y-8'>
      <DelayedNavigation session={session} />

      <div className='text-lg font-bold'>접속 시 처음 나오는 화면입니다</div>
      <div className='text-lg font-bold'>
        3초 뒤에 로그인 유무에 따라 페이지가 넘어가요옷
      </div>
    </div>
  );
}
