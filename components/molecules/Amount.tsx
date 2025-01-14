import { useState } from 'react';
import { ButtonMedium } from '../atoms/Buttons/ButtonMedium';
import PriceInput from '../atoms/Inputs/PriceInput';

type AmountOption = {
  value: number | 'custom';
  label: string;
};

const amountOptions: AmountOption[] = [
  { value: 100000, label: '10만원' },
  { value: 200000, label: '20만원' },
  { value: 300000, label: '30만원' },
  { value: 400000, label: '40만원' },
  { value: 500000, label: '50만원' },
  { value: 'custom', label: '직접 입력' },
];

const Amount = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>();
  const [customAmount, setCustomAmount] = useState('');

  const handleAmountClick = (value: number | 'custom') => {
    setSelectedAmount(value);
    if (value !== 'custom') setCustomAmount(''); // Clear custom input if a predefined amount is selected
  };

  return (
    <div>
      <div className='mb-[18px] text-lg font-semibold'>금액 설정하기</div>

      <div className='grid grid-cols-2 gap-[10px]'>
        {amountOptions.map((option) => (
          <ButtonMedium
            key={option.value}
            text={option.label}
            selected={selectedAmount === option.value}
            onClick={() => handleAmountClick(option.value)}
          />
        ))}
      </div>
      {selectedAmount === 'custom' && (
        <div className='mt-4'>
          <div className='mb-[18px] font-semibold'>
            <span className='text-lg'>직접 입력하기 </span>
            <span className='text-sm'>(최대 50만원)</span>
          </div>

          <PriceInput value={customAmount} onChange={setCustomAmount} />
        </div>
      )}
    </div>
  );
};

export default Amount;
