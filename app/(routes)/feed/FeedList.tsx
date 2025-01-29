'use client';

import EmptyState from '@/components/molecules/EmptyState/EmptyState';
import FeedCard from '@/components/molecules/FeedCard/FeedCard';
import { Skeleton } from '@/components/ui/skeleton';
import useFeedQuery from '@/hooks/useFeedApi/useFeedQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { LuPlus } from 'react-icons/lu';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function FeedList() {
  const { selectedFamily } = useSelectedFamilyStore();
  const { GetFeed } = useFeedQuery();
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    GetFeed(selectedFamily?.family_id, {
      enabled: !!selectedFamily?.family_id,
    });

  useIntersectionObserver({
    target: bottomRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);

      // 스크롤이 멈추면 버튼 표시
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  });

  if (isFetching && !data) {
    return (
      <div ref={bottomRef} className='flex flex-col w-full gap-4 py-4'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='flex flex-col space-y-3'>
            <div className='flex gap-2 items-center pl-3'>
              <Skeleton className='h-[30px] w-[30px] rounded-full' />
              <Skeleton className='h-4 w-[70px]' />
            </div>
            <Skeleton className=' w-full aspect-square ' />
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

  // 가족이 선택되지 않은 경우
  if (!data && !selectedFamily?.family_id) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-full pb-20'>
        <EmptyState
          title='아직 소속된 가족이 없어요'
          subtitle={`가족을 생성하고
소식을 주고 받아보세요!`}
        />
      </div>
    );
  }

  // 데이터가 없거나 첫 페이지의 컨텐츠가 비어있는 경우
  if (!data?.pages || data.pages[0]?.contents?.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-full pb-20'>
        <EmptyState
          title='아직 업로드된 소식이 없어요'
          subtitle={`피드를 업로드하고
소식을 주고 받아보세요!`}
          href='/feed/create'
          buttonText='게시글 작성하기'
        />
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className='pageLayout overflow-y-scroll scrollbar-hide'
    >
      <div className='flex flex-col gap-[0.5px] pb-32 relative'>
        {data?.pages?.length > 0 && (
          <>
            {data.pages.map((page) =>
              page?.contents.map((feed) => (
                <FeedCard key={feed.feed_id} feed={feed} />
              ))
            )}
          </>
        )}
        <Link
          href='/feed/create'
          className={`fixed bottom-[90px] right-5 z-50 flex items-center rounded-full bg-appColor text-white transition-all duration-300 ease-in-out p-3 ${
            isScrolling ? 'w-[48px]' : 'w-[105px]'
          } h-[48px]`}
        >
          <LuPlus
            className={`w-[24px] h-[24px] ${isScrolling ? '' : 'mr-2'}`}
          />
          <span
            className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
              isScrolling ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
            글쓰기
          </span>
        </Link>

        <div ref={bottomRef} className='w-full p-5 pb-5'>
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
  );
}
