import { LuPlus } from 'react-icons/lu';
import { RegisterCardProps } from './RegisterCard';

const RegisterCardSmall = ({ text, onClick }: RegisterCardProps) => {
  return (
    <div
      onClick={onClick}
      className='flex items-center justify-center gap-2.5 bg-white rounded-xl px-[71px] py-4 border border-[#eaecef]'
    >
      <div className='flex items-center justify-center w-5 h-5 rounded-full bg-appColor text-white'>
        <LuPlus className='w-3 h-3' />
      </div>

      <p className='text-appColor font-medium text-sm'>{text}</p>
    </div>
  );
};

export default RegisterCardSmall;
