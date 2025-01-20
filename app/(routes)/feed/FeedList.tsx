'use client';

import FeedCard from '@/components/molecules/FeedCard/FeedCard';
import { Skeleton } from '@/components/ui/skeleton';
import { GetPaginationResult, ResponseType } from '@/hooks/useApi';
import { useFeedApi } from '@/hooks/useFeedApi/useFeedApi';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { TFeed } from '@/types/Feed';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LuPlus } from 'react-icons/lu';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface FeedListProps {
  initialData: ResponseType<GetPaginationResult<TFeed>>;
  familyId: number;
}

export default function FeedList({ initialData, familyId }: FeedListProps) {
  const { getFeedList } = useFeedApi();
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['feeds'],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getFeedList(pageParam, familyId);
        return response;
      },
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      getNextPageParam: (lastPage) => {
        if (!lastPage.result?.hasNext) return undefined;
        return lastPage.result.page + 1;
      },
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
    let lastScrollTop = scrollContainer.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = scrollContainer.scrollTop;

      setIsScrolling(true);

      lastScrollTop = currentScrollTop;

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
  }, []);

  return (
    <div ref={scrollContainerRef} className='pageLayout overflow-y-scroll'>
      <div className='flex flex-col gap-[0.5px] pb-32 relative'>
        {data?.pages.map((page) =>
          page.result?.content.map((feed) => (
            <FeedCard key={feed.feed_id} feed={feed} />
          ))
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
  );
}
