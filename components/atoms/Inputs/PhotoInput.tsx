import { LuCamera } from 'react-icons/lu';
import { ReactNode } from 'react';

type PhotoInputProps = {
  maxLength: number;
  children?: ReactNode;
  onClick: () => void;
};

const PhotoInput = ({ maxLength, children, onClick }: PhotoInputProps) => {
  return (
    <div
      className='flex flex-col items-center justify-center bg-white border border-appColor rounded-lg  py-10 w-full'
      onClick={onClick}
    >
      <div className='flex flex-col items-center'>
        <div className='flex items-center gap-2 text-appColor font-semibold text-base'>
          <LuCamera className='w-[31px] h-[31px]' />
          사진/영상을 올려주세요
        </div>

        <p className='text-appColor font-medium text-[13px] mt-[10px]'>
          사진 최대 {maxLength}장 또는 영상 1개
        </p>
        {children}
      </div>
    </div>
  );
};

export default PhotoInput;
