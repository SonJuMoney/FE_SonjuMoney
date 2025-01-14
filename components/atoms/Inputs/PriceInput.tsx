'use client';

import { ChangeEvent, useState } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const PriceInput = ({ value, onChange }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

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
      return;
    }

    onChange?.(numericValue);
  };

  return (
    <input
      type='text'
      value={formatCurrency(value)}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder='얼마를 보낼까요?'
      className=' text-appColor text-[24px] font-semibold outline-none border-none placeholder:font-medium placeholder:text-placeHolder'
    />
  );
};

export default PriceInput;
