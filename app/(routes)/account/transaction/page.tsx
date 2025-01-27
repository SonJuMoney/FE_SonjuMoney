'use client';

import Header from '@/components/atoms/Headers/Header';
import TransactionList from './TransactionList';

const TransactionPage = ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const accountId = Number(searchParams.id);
  return (
    <div className='pageLayout'>
      <Header title='거래 내역 조회하기' />
      <TransactionList accountId={accountId} />
    </div>
  );
};

export default TransactionPage;
