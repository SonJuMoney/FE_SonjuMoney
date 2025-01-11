import Hana from '@/assets/BankImage/Hana.jpg';
import { FaCheck } from 'react-icons/fa';
import Image from 'next/image';
import { CheckboxAtomProps } from './CheckBox';

export default function BankCheckBox({ checked, onChange }: CheckboxAtomProps) {
  return (
    <label className='flex items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={checked}
        onChange={() => onChange(!checked)}
        className='hidden'
      />
      <div
        className={`h-[40px] w-[40px] flex items-center justify-center border-1 rounded-full bg-white text-appColor text-xl
    ${checked ? ' border border-appColor' : ' border border-gray-100 '}`}
      >
        {checked ? (
          <FaCheck />
        ) : (
          <Image
            src={Hana}
            alt={'하나은행'}
            className='rounded-full aspect-square object-contain '
            width={40}
            height={40}
            sizes='w-[40px] h-[40px]'
          />
        )}
      </div>
    </label>
  );
}
