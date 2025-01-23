import Header from '@/components/atoms/Headers/Header';
import SavingList from './SavingList';

const SavingDetailPage = ({
  searchParams,
}: {
  searchParams: { id: number };
}) => {
  const savingId = searchParams.id;
  console.log('11', savingId);
  return (
    <div className='pageLayout'>
      <Header title='이체 내역 확인하기' />
      <SavingList savingId={savingId} />
    </div>
  );
};

export default SavingDetailPage;
