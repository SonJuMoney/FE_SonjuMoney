'use client';

import DynamicInput from '@/components/ui/dinamicInput';
import { useState } from 'react';

type Props = {
  key: string;
  inputType: string;
  value: string;
  onChange: (value: string) => void;
  question: string;
  placeholder: string;
  validate: (value: string) => boolean;
  errorMessage: string;
  onValidation: (isValid: boolean) => void;
  width: number;
};

const SignUpInput = ({
  key,
  inputType,
  value,
  onChange,
  question,
  placeholder,
  validate,
  errorMessage,
  onValidation,
  width,
}: Props) => {
  const [error, setError] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValid = validate(value);
      setError(isValid ? '' : errorMessage);
      onValidation(isValid);
    }
  };

  const handleChange = (newValue: string) => {
    if (key === 'residentNum') {
      // 주민번호일 때만 숫자만 입력받도록 처리
      const numbersOnly = newValue.replace(/[^0-9]/g, '');
      onChange(numbersOnly);
    } else {
      // 다른 입력필드는 그대로 입력값 전달
      onChange(newValue);
    }
    if (error) setError('');
  };

  const formatResidentNumber = (value: string) => {
    if (!value) return '';
    const front = value.slice(0, 6);
    const back = value.slice(6, 13);
    if (back) {
      return `${front} - ${back.charAt(0)}******`;
    }
    return front;
  };

  const displayValue =
    key === 'residentNum' ? formatResidentNumber(value) : value;

  return (
    <div className='w-full max-w-md mx-auto mb-4 space-y-4 '>
      <div className='bg-[#F8B62D] text-white font-semibold text-[15px] px-4 py-3 rounded-[16px] inline-block shadow-md'>
        {question}
      </div>
      <div className='flex justify-end'>
        <DynamicInput
          type={inputType}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          minWidth={`${width}ch`}
          // maxLength={key === 'residentNum' ? 14 : undefined}
          className='px-4 py-3  text-secondary font-semibold text-[15px] rounded-[16px] focus:outline-none focus:ring-0 shadow-md placeholder:text-placeHolder'
        />
      </div>
      {error && <div className='text-error text-sm text-right'>{error}</div>}
    </div>
  );
};

export default SignUpInput;
