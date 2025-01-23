'use client';

import Alarm from '@/components/atoms/Alarm/Alarm';
import EmptyState from '@/components/molecules/EmptyState/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import useAlarmQuery from '@/hooks/useAlarmApi/useAlarmQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useRef } from 'react';

const AlarmList = () => {
  const { GetAlarmList } = useAlarmQuery();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    GetAlarmList();

  useIntersectionObserver({
    target: bottomRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isFetching && !data) {
    return (
      <div className='flex flex-col w-full gap-4 py-4 items-center'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='flex flex-col space-y-3 items-center'>
            <div className='flex gap-4 pl-4 items-center'>
              <div className='space-y-2 flex flex-col justify-center items-center'>
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
          title='도착한 알림이 없어요'
          href='/home'
          buttonText='홈으로 돌아가기기'
        />
      </div>
    );
  }

  return (
    <div className='pageLayout overflow-y-scroll'>
      {data && data.pages.length > 0 ? (
        <>
          {data.pages.map((page) =>
            page?.contents.map((alarm) => (
              <Alarm key={alarm.alarm_id} data={alarm} />
            ))
          )}
        </>
      ) : (
        <EmptyState
          title='도착한 알림이 없어요'
          href='/home'
          buttonText='홈으로 돌아가기기'
        />
      )}

      <div ref={bottomRef} className='w-full p-5 pb-5'>
        {isFetchingNextPage && (
          <div className='flex flex-col space-y-3 items-center'>
            <div className='flex gap-4 pl-4 items-center'>
              <div className='space-y-2 flex flex-col justify-center items-center'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='flex w-full p-4 justify-center'>
        <span className='text-placeHolder'>
          최근 60일 간의 알림만 확인할 수 있어요
        </span>
      </div>
    </div>
  );
};

export default AlarmList;
