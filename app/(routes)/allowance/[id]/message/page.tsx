import { fetchData } from '@/app/actions/fetchData';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { AllowanceResponse } from '@/types/Allowance';
import MessageForm from './MessageForm';

async function getAllowanceData(id: string): Promise<AllowanceResponse> {
  return await fetchData(`/allowances/${id}`, { method: 'GET' })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}

export default async function MessagePage({
  params,
}: {
  params: { id: string };
}) {
  const allowanceData = await getAllowanceData(params.id);

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
