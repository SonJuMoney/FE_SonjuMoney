'use client';

import FeedCard from '@/components/molecules/FeedCard/FeedCard';
import { Skeleton } from '@/components/ui/skeleton';
import { GetPaginationResult, ResponseType } from '@/hooks/useApi';
import { useFeedApi } from '@/hooks/useFeedApi/useFeedApi';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { TFeed } from '@/types/Feed';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';

interface FeedListProps {
  initialData: ResponseType<GetPaginationResult<TFeed>>;
  familyId: number;
}

export default function FeedList({ initialData, familyId }: FeedListProps) {
  const { getFeedList } = useFeedApi();
  const bottomRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className='flex flex-col gap-4'>
      {data?.pages.map((page) =>
        page.result?.content.map((feed) => (
          <FeedCard key={feed.feed_id} feed={feed} />
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
  );
}
