'use client';

import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import PlanCard from '@/components/molecules/Cards/PlanCard';
import MonthPicker from '@/components/ui/monthPicker';
import { useEffect, useState } from 'react';

const PlanList = () => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset).toISOString().split('T')[0];

  console.log(today);

  const events = [
    {
      date: '2025-01-13',
      day: '월요일',
      events: [
        {
          id: 1,
          type: 'MEMORIAL',
          title: '준용이네 부부 결혼 기념일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },

        {
          id: 2,
          type: 'BIRTHDAY',
          title: '준용이 생일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },
        {
          id: 3,
          type: 'MEMORIAL',
          title: '준용이네 부부 결혼 기념일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },

        {
          id: 4,
          type: 'BIRTHDAY',
          title: '준용이 생일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },
        {
          id: 5,
          type: 'MEMORIAL',
          title: '준용이네 부부 결혼 기념일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },

        {
          id: 6,
          type: 'BIRTHDAY',
          title: '준용이 생일',
          time: '종일',
          members: [{ id: 1, name: 'Member1', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-16',
      day: '화요일',
      events: [
        {
          id: 7,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 8,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-17',
      day: '화요일',
      events: [
        {
          id: 9,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 10,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 11,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 12,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
        {
          id: 13,
          type: 'DINING',
          title: '건강 검진',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-20',
      day: '화요일',
      events: [
        {
          id: 14,
          type: 'DINING',
          title: '4',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-23',
      day: '화요일',
      events: [
        {
          id: 15,
          type: 'DINING',
          title: '5',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },

    {
      date: '2025-01-24',
      day: '화요일',
      events: [
        {
          id: 16,
          type: 'DINING',
          title: '5',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
    {
      date: '2025-01-25',
      day: '화요일',
      events: [
        {
          id: 17,
          type: 'DINING',
          title: '5',
          time: '오전 10시',
          members: [{ id: 3, name: 'Member3', imgUrl: '/Role1.png' }],
        },
      ],
    },
  ];

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  useEffect(() => {
    console.log(currentMonth);
  }, [currentMonth]);

  return (
    <div className='pageLayout'>
      <LogoHeader showFamily={true} />
      <MonthPicker
        currentMonth={currentMonth}
        onMonthChange={handleMonthChange}
      />
      <div className='px-5'>
        {events.map((day) => (
          <PlanCard
            key={day.date}
            date={day.date}
            day={day.day}
            events={day.events}
            isToday={day.date === today}
          />
        ))}
      </div>
    </div>
  );
};
export default PlanList;
