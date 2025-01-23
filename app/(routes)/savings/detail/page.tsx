import Header from '@/components/atoms/Headers/Header';
import SavingList from './SavingList';

const SavingDetailPage = ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const savingId = Number(searchParams.id);
  return (
    <div className='pageLayout'>
      <Header title='적금 내역 확인하기' />
      <SavingList savingId={savingId} />
    </div>
  );
};

export default SavingDetailPage;
