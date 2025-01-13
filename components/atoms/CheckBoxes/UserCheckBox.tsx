import { FaCheck, FaUser } from 'react-icons/fa';
import { CheckboxAtomProps } from './CheckBox';

export default function UserCheckBox({ checked, onChange }: CheckboxAtomProps) {
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
        {checked ? <FaCheck /> : <FaUser />}
      </div>
    </label>
  );
}
