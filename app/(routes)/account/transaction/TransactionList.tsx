'use client';

import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import EmptyState from '@/components/molecules/EmptyState/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import useAccountQuery from '@/hooks/useAccountApi/useAccountQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';

export default function TransactionList({ accountId }: { accountId: number }) {
  const { GetTransactions } = useAccountQuery();
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    GetTransactions(accountId);

  useIntersectionObserver({
    target: bottomRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const formatDate = (data: string) => {
    const dateArray = data.split('-');
    const month = parseInt(dateArray[1], 10);
    const date = dateArray[2];
    return `${month}월 ${date}일`;
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {}, 100);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!data) {
    return (
      <div ref={bottomRef} className='flex flex-col w-full gap-4 py-4'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className='flex flex-col space-y-3'>
            <div className='flex gap-2 items-center pl-3'>
              <Skeleton className='h-[30px] w-[30px] rounded-full' />
              <Skeleton className='h-4 w-[70px]' />
            </div>
            <div className='flex gap-4 pl-4'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 데이터가 없거나 첫 페이지의 컨텐츠가 비어있는 경우
  if (!data?.pages || data.pages[0]?.contents?.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-full pb-20'>
        <EmptyState
          title='아직 거래한 내역이 없어요'
          href='/home'
          buttonText='홈으로 돌아가기'
        />
      </div>
    );
  }

  return (
    <div className='defaultLayout gap-5'>
      <PageTitle
        title={`내 계좌
거래 내역이에요`}
      />
      <div ref={scrollContainerRef} className='w-full h-full overflow-y-scroll'>
        <div className='flex flex-col gap-[0.5px] pb-32'>
          {data.pages.map((page) =>
            page.contents.map((content) => (
              <div key={content.date}>
                <div className='text-[13px] font-semibold py-2 text-darkGray'>
                  {formatDate(content.date)}
                </div>

                {content.transactions.map((transaction) => (
                  <div key={transaction.after_balance}>
                    <div className='w-full flex justify-between mt-2 font=medium p-2'>
                      <div className='flex flex-col justify-center space-y-1'>
                        <div
                          className={`text-[15px] ${transaction.transaction_type === '출금' ? 'text-black' : 'text-appColor'}`}
                        >
                          {transaction.transaction_type}
                        </div>
                        <div className='text-darkGray text-[11px]'>
                          {transaction.created_at.split('T')[1].slice(0, 5)}
                        </div>
                      </div>
                      <div className='flex flex-col justify-center text-right space-y-1'>
                        <div
                          className={`text-[15px] ${transaction.transaction_type === '출금' ? 'text-black' : 'text-appColor'}`}
                        >
                          {transaction.transaction_type === '출금'
                            ? `-${transaction.amount.toLocaleString()}원`
                            : `+${transaction.amount.toLocaleString()}원`}
                        </div>
                        <div className='text-darkGray text-[11px]'>{`${transaction.after_balance.toLocaleString()}원`}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}

          <div ref={bottomRef} className='w-full pb-5'>
            {isFetchingNextPage && (
              <div className='flex flex-col space-y-3'>
                <Skeleton className='h-[125px] w-full rounded-xl' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-[250px]' />
                  <Skeleton className='h-4 w-[200px]' />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
