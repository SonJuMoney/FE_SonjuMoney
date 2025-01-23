'use client';

import CircleImg from '@/components/atoms/CircleImages/CircleImg';
import { TEvent } from '@/types/Events';
import { format, isSameDay, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { getProfileImage } from '@/lib/utils';

enum EventType {
  여행 = 'bg-lavendar',
  생일 = 'bg-lemon',
  약속 = 'bg-skyBlue',
  기념일 = 'bg-peach',
  기타 = 'bg-brown',
}

type PlanCardProps = {
  date: string; // Format: YYYY-MM-DD
  day: string; // Example: "월요일"
  events: TEvent[];
  isToday: boolean;
};

const PlanCard = ({ date, day, events, isToday }: PlanCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const formatDateTime = (startDateTime: string, endDateTime: string) => {
    const start = parseISO(startDateTime);
    const end = parseISO(endDateTime);

    if (isSameDay(start, end)) {
      return `${format(start, 'HH:mm')} ~ ${format(end, 'HH:mm')}`;
    }

    return `${format(start, 'MM/dd')} ~ ${format(end, 'MM/dd')}`;
  };

  // Scroll to today's card on initial render
  useEffect(() => {
    if (isToday && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isToday]);

  const goEventDetail = (eventId: number) => {
    router.push(`/calendar/detail/${eventId}`);
  };

  return (
    <div ref={cardRef} style={{ scrollMarginTop: '120px' }}>
      {/* Date and Day */}
      <div className='flex items-center gap-2 mb-2 font-bold'>
        <div
          className={`w-[10px] h-[10px] rounded-full ${
            isToday ? 'bg-appColor' : 'bg-[#D9D9D9]'
          }`}
        ></div>
        <div className={isToday ? 'text-appColor' : 'text-darkGray'}>
          <span className='text-2xl font-semibold'>
            {parseInt(date.split('-')[2], 10)}
          </span>{' '}
          <span className='text-md'>{day}</span>
        </div>
      </div>

      <div
        className={`border p-5 bg-white rounded-[16px] shadow-md  ${
          isToday ? 'border-appColor' : 'border-[#c3c2c2]'
        } mb-4
      `}
      >
        {/* Events */}
        {events.map((event, index) => (
          <div
            key={event.event_id}
            className={`flex justify-between items-end ${
              index < events.length - 1
                ? 'pb-4 mb-4 border-b border-[#dadada]'
                : ''
            }`}
            onClick={() => goEventDetail(event.event_id)}
          >
            {/* Event Info */}
            <div className='flex items-center gap-2'>
              <div
                className={`w-[6px] h-10 rounded-[50px] ${
                  EventType[event.event_category as keyof typeof EventType]
                }`}
              ></div>
              <div className='flex flex-col'>
                <div className='text-[16px] font-semibold'>
                  {event.event_name}
                </div>
                <div className='text-[14px]'>
                  {event.all_day_status === '하루 종일'
                    ? '종일'
                    : formatDateTime(
                        event.start_date_time,
                        event.end_date_time
                      )}
                </div>
              </div>
            </div>

            <div className='flex flex-col items-end gap-2'>
              {/* Members */}
              <div className='flex items-center gap-2'>
                {event.event_participants.slice(0, 4).map((participation) => (
                  <CircleImg
                    key={participation.participation_id}
                    imgUrl={
                      participation.profile_link ??
                      getProfileImage(participation.member_role)
                    }
                    size={20}
                    border={true}
                  />
                ))}
                {event.event_participants.length > 4 && (
                  <div className='flex items-center justify-center w-[20px] h-[20px] rounded-full bg-white aspect-square object-contain text-[10px] font-semibold text-darkGray'>
                    +{event.event_participants.length - 4}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCard;
