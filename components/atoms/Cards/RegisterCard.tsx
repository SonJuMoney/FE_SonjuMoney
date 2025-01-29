import { LuPlus } from 'react-icons/lu';

export type RegisterCardProps = {
  text: string;
  onClick?: () => void;
};

const RegisterCard = ({ text, onClick }: RegisterCardProps) => {
  return (
    <div
      onClick={onClick}
      className='flex flex-col items-center justify-center bg-white rounded-xl p-4 border border-[#eaecef]'
    >
      <div className='flex items-center justify-center w-10 h-10 rounded-full bg-appColor text-white'>
        <LuPlus className='w-[18px] h-[18px]' />
      </div>

      <p className='mt-2 text-appColor font-bold text-[15px]'>{text}</p>
    </div>
  );
};

export default RegisterCard;
