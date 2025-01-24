import { fetchData } from '@/app/actions/fetchData';
import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import CompleteMessage from '@/components/molecules/CompleteMessages/CompleteMessage';
import { AllowanceResponse } from '@/types/Allowance';
import Link from 'next/link';

async function getAllowanceData(id: number): Promise<AllowanceResponse> {
  return await fetchData(`/allowances/${id}`, { method: 'GET' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default async function CompletePage({
  params,
}: {
  params: { id: number };
}) {
  const allowanceData = await getAllowanceData(params.id);

  return (
    <div className='pageLayout'>
      <Header title='용돈 받기' showBackButton={false} />
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
