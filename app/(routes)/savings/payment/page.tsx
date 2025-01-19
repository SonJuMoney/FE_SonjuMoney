'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import DateSelect from '@/components/atoms/Selects/DateSelect';
import Amount from '@/components/molecules/Amount';
import useSavingsAccountStore from '@/store/useSavingsAccountStore';
import { useRouter } from 'next/navigation';

const SetAutomaticPayment = () => {
  const { selectedDate, selectedAmount, customAmount, setSelectedAmount } =
    useSavingsAccountStore();

  const router = useRouter();

  const isAmountValid =
    selectedAmount === 'custom'
      ? customAmount &&
        Number(customAmount) > 0 &&
        Number(customAmount) <= 500000
      : !!selectedAmount;

  const isNextButtonEnabled = isAmountValid && !!selectedDate;

  const handleNextClick = () => {
    if (selectedAmount === 'custom') {
      setSelectedAmount(Number(customAmount));
    }
    router.push('/savings/result');
  };

  return (
    <div className='pageLayout'>
      <Header
        title='적금 들어주기'
        actionButton={{
          label: '건너뛰기',
          onClick: () => router.push('/savings/result'),
        }}
      />
      <div className='defaultLayout gap-[25px]'>
        <PageTitle
          title={`자동이체를 등록할까요?`}
          subTitle={`자유적립식 상품으로 자유롭게
매 분기(3달) 최대 150만원씩 적금 가능해요`}
        />

        <div>
          <div className='mb-4 text-lg font-semibold'>자동이체 날짜</div>
          <DateSelect />
        </div>

        <div>
          <div className='mb-[18px] text-lg font-semibold'>금액 설정하기</div>
          <Amount />
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='다음'
          disabled={!isNextButtonEnabled}
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};
export default SetAutomaticPayment;
