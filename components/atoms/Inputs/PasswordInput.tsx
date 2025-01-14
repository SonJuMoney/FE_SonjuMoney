'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  password: string;
  setPassword: (password: string) => void;
};

const PasswordInput = ({ password, setPassword }: Props) => {
  const [numbers, setNumbers] = useState<(number | string)[]>([]);

  useEffect(() => {
    shuffleNumbers();
  }, []);

  const shuffleNumbers = () => {
    const nums = [...Array.from({ length: 10 }, (_, i) => i), '로고'];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setNumbers(nums);
  };

  const handleNumberClick = (num: number | string) => {
    if (password.length < 6) {
      setPassword(password + num);
    }
  };

  const handleBackspace = () => {
    setPassword(password.slice(0, -1));
  };

  return (
    <div className='w-full'>
      <div className='grid grid-cols-4 gap-2 '>
        {numbers.map((num, index) => (
          <Button
            key={index}
            onClick={() => handleNumberClick(num)}
            variant='ghost'
            className='w-full marker:aspect-square text-[26px] font-semibold text-center my-2'
          >
            {num}
          </Button>
        ))}

        <Button
          onClick={handleBackspace}
          variant='ghost'
          className='w-full marker:aspect-square font-semibold flex items-center justify-center my-auto'
        >
          <ArrowLeft className='h-5 w-5 font-semibold' />
        </Button>
      </div>
    </div>
  );
};

export default PasswordInput;
