import { LuCamera } from 'react-icons/lu';

type PhotoInputProps = {
  maxLength: number;
};

const PhotoInput = ({ maxLength }: PhotoInputProps) => {
  return (
    <div className='flex flex-col items-center justify-center bg-white border border-appColor rounded-lg px-[68px] py-10'>
      <div className='flex flex-col items-center'>
        <div className='flex items-center gap-2 text-appColor font-semibold text-base'>
          <LuCamera className='w-[31px] h-[31px]' />
          사진/영상을 올려주세요
        </div>

        <p className='text-appColor font-medium text-[13px] mt-[10px]'>
          사진 최대 {maxLength}장 또는 영상 1개
        </p>
      </div>
    </div>
  );
};

export default PhotoInput;
