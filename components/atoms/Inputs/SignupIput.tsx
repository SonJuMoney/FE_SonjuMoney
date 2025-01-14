'use client';

import { useState } from 'react';

type Props = {
  inputType: string;
  value: string;
  onChange: (value: string) => void;
  question: string;
  placeholder: string;
  validate: (value: string) => boolean;
  errorMessage: string;
};

const SignUpInput = ({
  inputType,
  value,
  onChange,
  question,
  placeholder,
  validate,
  errorMessage,
}: Props) => {
  const [error, setError] = useState<string>('');
  const [inputValue, setInputValue] = useState(value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValid = validate(inputValue);
      setError(isValid ? '' : errorMessage);
      if (isValid) {
        onChange(inputValue);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='w-full max-w-md mx-auto mb-4 space-y-2'>
      <div className='bg-[#FFB800] text-white px-4 py-2 rounded-full inline-block'>
        {question}
      </div>
      <div className='flex justify-end'>
        <input
          type={inputType}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='w-48 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB800]'
          placeholder={placeholder}
        />
      </div>
      {error && <div className='text-error text-sm text-right'>{error}</div>}
    </div>
  );
};

export default SignUpInput;
