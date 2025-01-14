import AnimatedCheck from '@/components/atoms/AnimatiedIcons/Check';
import { ReactNode } from 'react';

type CompleteMessageProps = {
  title: ReactNode;
  subTitle?: ReactNode;
};

const CompleteMessage = ({ title, subTitle }: CompleteMessageProps) => {
  return (
    <div className='flex justify-center items-center h-3/4'>
      <div className='flex flex-col gap-[70px] justify-center items-center'>
        <div className='flex flex-col w-full text-center items-center gap-[18px]'>
          <span className='text-black text-2xl font-semibold max-w-[250px]  break-words'>
            {title}
          </span>
          {subTitle && (
            <span className='text-darkGray text-[15px] font-semibold max-w-[320px]  break-words'>
              {subTitle}
            </span>
          )}
        </div>
        <AnimatedCheck />
      </div>
    </div>
  );
};

export default CompleteMessage;

// 사용법
// 1. 중간에 하이라이트(appColor)가 들어가는 경우
{
  /* <CompleteMessage
  title={
    <>
      <span className='text-appColor'>할아버지</span>께서
      <br />
      용돈을 보내셨어요
    </>
  }
  subTitle='손주에게 용돈을 보내보세요!'
/> */
}

// 2. 올 블랙
{
  /* <CompleteMessage
  title='손주의 계좌가 연동되었어요요'
  subTitle='손주에게 용돈을 보내보세요!'
/> */
}
