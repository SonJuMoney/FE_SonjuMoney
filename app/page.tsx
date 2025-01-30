import { DelayedNavigation } from '@/components/molecules/DelayedNavigation';
import Logo from '@/public/Logo/Logo_appLoad.svg';
import Image from 'next/image';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center space-y-8 text-white bg-appColor'>
      <DelayedNavigation session={session} time={3000} />

      <div className='flex items-center gap-1'>
        <Image src={Logo} alt={'Logo'} width={50} height={50} />
        <div className='text-[40px] font-bold'>손주머니</div>
      </div>

      <div className='space-y-3'>
        <div className='text-lg font-semibold'>
          우리 가족의 따뜻한 금융 소식
        </div>
        <div className='text-center text-[15px] font-medium'>
          손주를 위한 용돈과
          <br />
          온가족 소식을 공유해보아요
        </div>
      </div>
    </div>
  );
}
