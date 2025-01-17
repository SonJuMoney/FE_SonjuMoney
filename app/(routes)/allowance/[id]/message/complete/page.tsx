import { fetchData } from '@/app/actions/fetchData';
import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CompleteMessage from '@/components/molecules/CompleteMessages/CompleteMessage';
import { AllowanceResponse } from '@/types/Allowance';
import Link from 'next/link';

async function getAllowanceData(id: string): Promise<AllowanceResponse> {
  const res = await fetchData(`/allowances/${id}`);

  return res.json();
}

export default async function CompletePage({
  params,
}: {
  params: { id: string };
}) {
  // const allowanceData = await getAllowanceData(params.id);
  const allowanceData: AllowanceResponse = {
    allowance_id: 1,
    sender_name: '박근하',
    amount: 300000,
  };

  return (
    <div className='pageLayout'>
      <Header title='용돈 받기' />
      <div className='defaultLayout'>
        <CompleteMessage
          title={
            <>
              <span className='text-appColor'>{allowanceData.sender_name}</span>
              님께 <br />
              마음이 전달되었어요
            </>
          }
          subTitle={`자주 연락하시면 ${allowanceData.sender_name}께서 더 행복합니다😁`}
        />
      </div>
      <Link href='/home' className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge type='submit' text='확인' />
      </Link>
    </div>
  );
}
