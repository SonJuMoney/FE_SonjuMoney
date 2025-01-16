'use client';

import CircleImg from '@/components/atoms/CircleImages/CircleImg';
import { FaEllipsisV } from 'react-icons/fa';
import { useEffect, useRef } from 'react';

enum EventType {
  TRAVEL = 'bg-lavendar',
  BIRTHDAY = 'bg-lemon',
  DINING = 'bg-skyBlue',
  MEMORIAL = 'bg-peach',
  OTHER = 'bg-brown',
}

type Member = {
  id: number;
  name: string;
  imgUrl: string;
};

type Event = {
  id: number;
  type: string;
  title: string;
  time?: string;
  members: Member[];
};

type PlanCardProps = {
  date: string; // Format: YYYY-MM-DD
  day: string; // Example: "월요일"
  events: Event[];
  isToday: boolean;
};

const PlanCard = ({ date, day, events, isToday }: PlanCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll to today's card on initial render
  useEffect(() => {
    if (isToday && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isToday]);

  return (
    <div ref={cardRef}>
      {/* Date and Day */}
      <div className='flex items-center gap-2 mb-2 font-bold'>
        <div
          className={`w-2 h-2 rounded-full ${
            isToday ? 'bg-appColor' : 'bg-darkGray'
          }`}
        ></div>
        <div className={isToday ? 'text-appColor' : 'text-darkGray'}>
          <span className='text-2xl font-semibold'>
            {parseInt(date.split('-')[2], 10)}
          </span>{' '}
          <span className='text-sm'>{day}</span>
        </div>
      </div>

      <div
        className={`
        p-5 bg-white rounded-2xl shadow-md border ${
          isToday ? 'border-appColor' : 'border-[#d9d9d9]'
        } mb-4
      `}
      >
        {/* Events */}
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`flex justify-between items-center ${
              index < events.length - 1
                ? 'pb-4 mb-4 border-b border-gray-200'
                : ''
            }`}
          >
            {/* Event Info */}
            <div className='flex items-center gap-2'>
              <div
                className={`w-[5px] h-10 rounded-[50px] ${
                  EventType[event.type as keyof typeof EventType] ||
                  EventType.OTHER
                }`}
              ></div>
              <div className='flex flex-col gap-2'>
                <div className='text-sm font-semibold'>{event.title}</div>
                <div className='text-xs'>{event.time}</div>
              </div>
            </div>

            <div className='flex flex-col items-end gap-2'>
              <FaEllipsisV className='text-gray-400' />
              {/* Members */}
              <div className='flex items-center gap-2'>
                {event.members.slice(0, 4).map((member) => (
                  <CircleImg
                    key={member.id}
                    imgUrl={member.imgUrl}
                    size={20}
                    border={true}
                  />
                ))}
                {event.members.length > 4 && (
                  <div className='flex items-center justify-center w-[20px] h-[20px] rounded-full bg-white aspect-square object-contain border border-disabled text-[8px] font-semibold text-darkGray'>
                    +{event.members.length - 4}
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
