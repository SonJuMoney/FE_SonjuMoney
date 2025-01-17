'use client';

import { SignUpData } from '@/store/useSignupStore';
import { ChangeEvent, useState } from 'react';

type Props = {
  id: keyof SignUpData;
  inputType: string;
  onChange: (value: string) => void;
  question: string;
  placeholder: string;
  validate: (value: string) => boolean | Promise<ValidationResult>;
  errorMessage: string;
  onValidation: (id: keyof SignUpData, isValid: boolean) => void;
  width: number;
};

type ValidationResult = { isValid: boolean; error: string };

const SignUpInput = ({
  id,
  inputType,
  onChange,
  question,
  placeholder,
  validate,
  errorMessage,
  onValidation,
  width,
}: Props) => {
  const [error, setError] = useState<string>('');
  const [displayValue, setDisplayValue] = useState<string>('');
  const [residentValue, setResidentValue] = useState<string>('');

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatResidentumber = (value: string) => {
    console.log(residentValue, value);
    const newValue =
      residentValue.length - 1 === value.replace('-', '').length
        ? residentValue.slice(0, -1)
        : (residentValue + value.slice(-1)).slice(0, 13);
    setResidentValue(newValue);
    const numbers = value.replace(/[^\d*]/g, '').slice(0, 13);

    if (numbers.length <= 6) return numbers;

    const firstPart = numbers.slice(0, 6);
    const secondPart = numbers.slice(6);
    const visibleDigit = secondPart.charAt(0);
    const maskedPart = '*'.repeat(secondPart.length - 1);

    return `${firstPart}-${visibleDigit}${maskedPart}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (id === 'phone') {
      setDisplayValue(formatPhoneNumber(e.target.value));
    } else if (id === 'residentNum') {
      setDisplayValue(formatResidentumber(e.target.value));
    } else {
      setDisplayValue(e.target.value);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      let currentValue = e.currentTarget.value;

      if (id === 'phone') {
        currentValue = currentValue.replace(/\D/g, '');
      } else if (id === 'residentNum') {
        currentValue = residentValue;
      }

      try {
        const result = await validate(currentValue);
        onChange(currentValue);

        if (typeof result === 'boolean') {
          if (result) {
            setError('');
            onValidation(id, true);
          } else {
            setError(errorMessage);
            onValidation(id, false);
          }
        } else {
          setError(result.error);
          onValidation(id, result.isValid);
        }
      } catch (error) {
        setError('오류가 발생했습니다');
        onValidation(id, false);
      }
    }
  };

  return (
    <div className='w-full max-w-md mx-auto mb-4 space-y-4 '>
      <div className='bg-[#F8B62D] text-white font-semibold text-[15px] px-4 py-3 rounded-[16px] inline-block shadow-md'>
        {question}
      </div>
      <div className='flex justify-end'>
        <input
          className='px-4 py-3 text-secondary font-semibold text-[15px] rounded-[16px] focus:outline-none focus:ring-0 shadow-md placeholder:text-placeHolder'
          autoFocus
          type={inputType}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            width: `${Math.max(displayValue.length + 1)}ch`,
            minWidth: `${width}ch`,
          }}
        />
      </div>
      {error && <div className='text-error text-sm text-right'>{error}</div>}
    </div>
  );
};

export default SignUpInput;
