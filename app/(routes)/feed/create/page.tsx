import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { AllowanceResponse } from '@/types/Allowance';
import FeedForm from './FeedForm';

export default async function CreateFeedpage({
  params,
}: {
  params: { family_id: number };
}) {
  const allowanceData: AllowanceResponse = {
    allowance_id: 1,
    sender_name: '박근하',
    amount: 300000,
  };

  return (
    <div className='pageLayout'>
      <Header title='소식 작성하기' />
      <div>
        <div className='px-4 pt-[25px]'>
          <PageTitle title={`게시글 작성하기`} />
        </div>
        <FeedForm family_id={params.family_id} />
      </div>
    </div>
  );
}
