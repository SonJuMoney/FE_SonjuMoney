'use client';

import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import TransactionCard from '@/components/molecules/Cards/TransactionCard';
import EmptyState from '@/components/molecules/EmptyState/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useSavingQuery from '@/hooks/useSavingApi/useSavingQuery';
import { useEffect, useRef, useState } from 'react';

export default function SavingList({ savingId }: { savingId: number }) {
  console.log('22', savingId);
  const { GetSavings } = useSavingQuery();
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    GetSavings(savingId);

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
    let lastScrollTop = scrollContainer.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = scrollContainer.scrollTop;

      lastScrollTop = currentScrollTop;

      // 스크롤이 멈추면 버튼 표시
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
          title='아직 이체한 내역이 없어요'
          subtitle={`송금하고 메세지를 남겨보세요!`}
        />
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col space-y-4 px-5 pt-10'>
        <PageTitle
          title={
            <>
              <span className='text-appColor'>장호준</span>님에게 납입한
              <br />
              적금 내역이에요
            </>
          }
        />
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between text-[18px] font-semibold mt-2'>
            <div>총 납입 내역</div>
            <div className='text-appColor'>2,350,000원</div>
          </div>
          <div className='flex justify-between text-[18px] font-semibold'>
            <div>이번달 납입 내역</div>
            <div className='text-appColor'>300,000원</div>
          </div>
          <div className='flex justify-between text-[14px] font-semibold'>
            <div>이번달 납입 가능 금액</div>
            <div>300,000원</div>
          </div>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className='w-full h-full px-5 pt-5 overflow-y-scroll'
      >
        <div className='flex flex-col gap-[0.5px] pb-32'>
          {data.pages.map((page) =>
            page.contents.map((content) => (
              <div key={content.date}>
                <div className='text-[13px] font-semibold py-2 text-darkGray'>
                  {formatDate(content.date)}
                </div>
                <TransactionCard transactions={content.transactions} />
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
