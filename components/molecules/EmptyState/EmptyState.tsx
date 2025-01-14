import { ButtonSmall } from '@/components/atoms/Buttons/ButtonSmall';
import Bear from '@/public/AnimatedIcons/Bear.png';
import Image from 'next/image';

type EmptyStateProps = {
  title: string;
  subtitle?: string;
};

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <div className='flex flex-col justify-center items-center w-full gap-[13px] py-10 pb-[70px]'>
      <Image src={Bear} alt='Bear' width={120} height={120} />
      <div className='flex flex-col justify-center items-center gap-1.5'>
        <span className='text-[18px]  text-darkGray font-semibold'>
          {title}
        </span>
        <span className='whitespace-pre-wrap text-center text-[17px] text-placeHolder'>
          {subtitle}
        </span>
      </div>
      <ButtonSmall text='가족 등록하러가기' active />
    </div>
  );
};

export default EmptyState;
