'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import { useToast } from '@/hooks/use-toast';
import { useEventApi } from '@/hooks/useEventApi/useEventApi';
import { TEvent } from '@/types/Events';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProfileImage } from '@/lib/utils';

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
  const router = useRouter();
  const { toast } = useToast();
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

    if (!response) {
      return;
    }
    toast({ title: '삭제되었습니다' });
    router.push('/calendar');
  };

  const goToUpdate = () => {
    router.push(`/calendar/update/${eventId}`);
  };

  return (
    <>
      <div className='pageLayout'>
        <Header title='일정 조회' />
        <div className='h-full p-5 flex flex-col justify-between space-y-4'>
          <div className='flex flex-col pt-5 space-y-8'>
            <div className='flex justify-between items-center'>
              {TitleComponent('분류')}
              {category && (
                <div className='flex items-center gap-4 border py-2 px-4 rounded-lg shadow-sm'>
                  <div
                    className={`w-4 h-4 rounded-full bg-${category.color}`}
                  ></div>
                  <div>{category.type}</div>
                </div>
              )}
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('제목')}
              <div className='border py-2 px-4 rounded-lg shadow-sm'>
                {event?.event_name}
              </div>
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('시작일')}
              {event && (
                <div className='border py-2 px-4 rounded-lg shadow-sm'>
                  {formatDate(event.start_date_time)}
                </div>
              )}
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('종료일')}
              {event && (
                <div className='border py-2 px-4 rounded-lg shadow-sm'>
                  {formatDate(event.end_date_time)}
                </div>
              )}
            </div>
            <div className='flex flex-col space-y-6 mt-2'>
              {TitleComponent('참여자')}
              <div className='grid grid-cols-4 gap-4'>
                {event?.event_participants.map((participant) => (
                  <div
                    key={participant.member_id}
                    className='flex flex-col items-center gap-4'
                  >
                    <div className='w-14 h-14 border rounded-full overflow-hidden'>
                      <Image
                        src={
                          participant.profile_link ??
                          getProfileImage(participant.member_role)
                        }
                        width={56}
                        height={56}
                        alt={participant.user_name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span className='text-sm font-medium'>
                      {participant.user_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex space-x-4'>
            <ButtonLarge text='수정' onClick={goToUpdate}></ButtonLarge>
            <ButtonLarge
              text='삭제'
              onClick={onDelete}
              className='bg-secondary'
            >
              삭제
            </ButtonLarge>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailPage;
