import { RegisterCardProps } from '@/types/register';

// + 아이콘 추가
const RegisterCard = ({ text }: RegisterCardProps) => {
  return (
    <div className='flex flex-col items-center justify-center bg-white rounded-xl p-4 border border-[#eaecef]'>
      <div className='flex items-center justify-center w-10 h-10 rounded-full bg-appColor text-white'>
        +
      </div>

      <p className='mt-2 text-appColor font-bold text-[15px]'>{text}</p>
    </div>
  );
};

export default RegisterCard;
