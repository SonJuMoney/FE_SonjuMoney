'use client';

import { ChangeEvent, useState } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  balance?: number;
  limitAmount?: number;
};

const PriceInput = ({ value, onChange, balance, limitAmount }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formatCurrency = (num: string) => {
    if (!num) return '';
    const numericValue = Number(value);
    const formatted = numericValue.toLocaleString('ko-KR');
    return isFocused ? formatted : `${formatted}원`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');

    if (numericValue === '') {
      onChange?.('');
      setErrorMessage('');
      return;
    }

    const numericAmount = Number(numericValue);

    if (limitAmount && numericAmount > limitAmount) {
      setErrorMessage('납입 한도를 초과했습니다.');
    } else {
      setErrorMessage('');
    }

    onChange?.(numericValue);
  };

  return (
    <div>
      <input
        type='text'
        value={formatCurrency(value)}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder='얼마를 보낼까요?'
        className={`${
          errorMessage ? 'text-error' : 'text-appColor'
        } text-[24px] font-semibold outline-none border-none placeholder:font-medium placeholder:text-placeHolder`}
      />
      {errorMessage && (
        <div className='mt-1 text-sm text-[#212529] font-medium'>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default PriceInput;
