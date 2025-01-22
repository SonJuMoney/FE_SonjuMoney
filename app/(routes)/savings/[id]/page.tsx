import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import TransactionCard from '@/components/molecules/Cards/TransactionCard';
import SavingList from './SavingList';

const SavingDetailPage = ({ params }: { params: { savingId: string } }) => {
  const { savingId } = params;
  return (
    <div className='pageLayout'>
      <Header title='이체 내역 확인하기' />
      <div className='flex flex-col space-y-4 px-5 pt-10'>
        <PageTitle
          title={`홍길동님에게
이체한 내역이에요`}
        />
        <div className='text-[18px] font-semibold'>최근 거래 내역</div>
        <SavingList savingId={savingId} />
        {/* <TransactionCard /> */}
      </div>
    </div>
  );
};

export default SavingDetailPage;
