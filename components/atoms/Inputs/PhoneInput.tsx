import { ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const PhoneInput = ({ value, onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    onChange?.(inputValue || '');
  };

  return (
    <input
      type='tel'
      value={value || ''}
      onChange={handleChange}
      maxLength={11}
      pattern='[0-9]*'
      inputMode='numeric'
      placeholder='-없이 입력해주세요 '
      className={`border rounded-md outline-none text-sm p-2 placeholder:text-placeHolder ${
        value
          ? 'border-appColor text-appColor'
          : 'border-disabled text-placeHolder'
      }`}
    />
  );
};

export default PhoneInput;
