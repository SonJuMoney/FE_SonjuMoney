import { fetchData } from '@/app/actions/fetchData';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { AllowanceResponse } from '@/types/Allowance';
import MessageForm from './MessageForm';

async function getAllowanceData(id: string): Promise<AllowanceResponse> {
  const res = await fetchData(`/allowances/${id}`);

  return res.json();
}

export default async function MessagePage({
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
      <div>
        <div className='px-4 pt-[25px]'>
          <PageTitle
            title={`${allowanceData.sender_name}님께
마음을 전해주세요`}
          />
        </div>
        <MessageForm
          allowanceId={params.id}
          sender_name={allowanceData.sender_name}
        />
      </div>
    </div>
  );
}
