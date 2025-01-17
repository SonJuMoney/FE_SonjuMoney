'use client';

import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import PlanCard from '@/components/molecules/Cards/PlanCard';
import { buttonVariants } from '@/components/ui/button';
import MonthPicker from '@/components/ui/monthPicker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/shadcn';

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
      date: '2025-01-20',
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
  const [showMonthPicker, setShowMonthPicker] = useState<boolean>(false);

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  useEffect(() => {
    console.log(currentMonth);
  }, [currentMonth]);

  const previousMonth = () => {};

  const nextMonth = () => {};

  return (
    <div className='pageLayout'>
      <div className='w-full fixed top-0 bg-white z-10'>
        <LogoHeader showFamily={true} />

        {!showMonthPicker && (
          <div className='px-5'>
            <div className='w-full relative flex items-center justify-center py-5'>
              <div
                className='text-lg font-semibold'
                aria-live='polite'
                role='presentation'
                id='month-picker'
                onClick={() => setShowMonthPicker(true)}
              >
                2025년 1월
              </div>
              <div className='flex items-center space-x-1'>
                <button
                  name='previous-year'
                  aria-label='Go to previous year'
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                    'absolute left-1'
                  )}
                  type='button'
                  onClick={previousMonth}
                >
                  <ChevronLeft className='h-4 w-4' />
                </button>
                <button
                  name='next-year'
                  aria-label='Go to next year'
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                    'absolute right-1 disabled:bg-slate-100'
                  )}
                  type='button'
                  onClick={nextMonth}
                >
                  <ChevronRight className='h-4 w-4' />
                </button>
              </div>
            </div>
          </div>
        )}

        {showMonthPicker && (
          <MonthPicker
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
            onChangePicker={setShowMonthPicker}
          />
        )}
      </div>
      <div className='px-5 mt-[120px]'>
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
