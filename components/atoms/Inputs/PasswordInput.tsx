'use client';

import { Button } from '@/components/ui/button';
import Logo from '@/public/Logo/Logo_Header.svg';
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
    <div className='w-full py-10 px-4'>
      <div className='grid grid-cols-4 gap-2 '>
        {numbers.map((num, index) =>
          num === '로고' ? (
            <div
              key={index}
              className='w-full h-full flex items-center justify-center'
            >
              <Logo />
            </div>
          ) : (
            <Button
              key={index}
              onClick={() => handleNumberClick(num)}
              variant='ghost'
              className='w-full marker:aspect-square text-[26px] font-semibold text-center my-2'
            >
              {num}
            </Button>
          )
        )}

        <div
          onClick={handleBackspace}
          className='w-full marker:aspect-square font-semibold flex items-center justify-center my-auto'
        >
          <ArrowLeft size={30} />
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
