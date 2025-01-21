'use client';

import Header from '@/components/atoms/Headers/Header';
import { Button } from '@/components/ui/button';
import { useEventApi } from '@/hooks/useEventApi/useEventApi';
import { TEvent } from '@/types/Events';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';

const TitleComponent = (title: string) => {
  return (
    <div className='flex space-x-4 items-center'>
      <div className='w-[10px] h-[10px] bg-appColor rounded-full'></div>
      <div className='text-lg font-medium'>{title}</div>
    </div>
  );
};

const categories: { type: string; color: string }[] | undefined = [
  { type: '생일', color: 'lemon' },
  { type: '기념일', color: 'peach' },
  { type: '약속', color: 'skyBlue' },
  { type: '여행', color: 'lavendar' },
  { type: '기타', color: 'brown' },
];

const EventDetailPage = ({ params }: { params: { eventId: string } }) => {
  const { eventId } = params;
  const { getEventDetail, deleteEvent } = useEventApi();

  const [event, setEvent] = useState<TEvent>();

  const category = event
    ? categories.find((category) => event.event_category === category.type)
    : undefined;

  const formatDate = (date: string) => {
    const parsedDate = parseISO(date);

    if (event?.all_day_status === '하루 종일') {
      return format(parsedDate, 'yyyy년 M월 d일', { locale: ko });
    } else {
      if (parsedDate.getMinutes() === 0) {
        return format(parsedDate, 'yyyy년 M월 d일 a h시', { locale: ko });
      }
      return format(parsedDate, 'yyyy년 M월 d일 a h시 m분', { locale: ko });
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await getEventDetail(eventId);
      setEvent(response);
    };

    fetchEvent();
  }, []);

  const onDelete = async () => {
    const response = await deleteEvent(eventId);
  };

  return (
    <>
      <div className='pageLayout'>
        <Header title='일정 조회' />
        <div className='h-full p-5 flex flex-col justify-start space-y-4'>
          <div className='flex justify-end space-x-4'>
            <Button variant={'outline'}>수정</Button>
            <Button variant={'outline'} onClick={onDelete}>
              삭제
            </Button>
          </div>
          <div className='flex flex-col space-y-12'>
            <div className='flex justify-between items-center'>
              {TitleComponent('분류')}
              {category && (
                <div className='flex items-center gap-4'>
                  <div
                    className={`w-4 h-4 rounded-full bg-${category.color}`}
                  ></div>
                  <div>{category.type}</div>
                </div>
              )}
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('제목')}
              <div>{event?.event_name}</div>
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('시작일')}
              {event && <div>{formatDate(event.start_date_time)}</div>}
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('종료일')}
              {event && <div>{formatDate(event.end_date_time)}</div>}
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('구성원')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailPage;
