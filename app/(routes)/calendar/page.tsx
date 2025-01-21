'use client';

import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import PlanCard from '@/components/molecules/Cards/PlanCard';
import { buttonVariants } from '@/components/ui/button';
import MonthPicker from '@/components/ui/monthPicker';
import { useEventApi } from '@/hooks/useEventApi/useEventApi';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { TEvent } from '@/types/Events';
import { add, format, sub } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/shadcn';

type Events = {
  current_date: string;
  current_day: string;
  events: TEvent[];
};

const PlanList = () => {
  const { getEvents } = useEventApi();
  const { selectedFamily } = useSelectedFamilyStore();

  const today: string = format(new Date(), 'yyyy-MM-dd');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState<boolean>(false);
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;
      if (selectedFamily) {
        const response = await getEvents(selectedFamily.family_id, year, month);
        console.log(response);
        const groupedEvents = groupEventsByDate(response);
        setEvents(groupedEvents);
      }
    };

    fetchEvents();
  }, [currentMonth, selectedFamily]);

  const groupEventsByDate = (events: TEvent[]) => {
    const grouped = events.reduce((acc: { [key: string]: Events }, event) => {
      const currentDate = event.current_date;

      if (!acc[currentDate]) {
        const date = new Date(currentDate);
        const day = date.toLocaleDateString('ko-KR', { weekday: 'long' });

        acc[currentDate] = {
          current_date: currentDate,
          current_day: day,
          events: [],
        };
      }

      acc[currentDate].events.push(event);
      return acc;
    }, {});

    return Object.values(grouped);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  const previousMonth = () => {
    const newMonth = sub(currentMonth, { months: 1 });
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = add(currentMonth, { months: 1 });
    setCurrentMonth(newMonth);
  };

  return (
    <div className='h-full overflow-y-auto scrollbar-hide'>
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
                {format(currentMonth, 'yyyy년 MM월', { locale: ko })}
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
      <div className='px-5 mt-[120px] pb-[120px]'>
        {events?.map((date) => (
          <PlanCard
            key={date.current_date}
            date={date.current_date}
            day={date.current_day}
            events={date.events}
            isToday={date.current_date === today}
          />
        ))}
        <div className='fixed bottom-[85px] right-[24px]'>
          <Link
            href='/calendar/add'
            className='w-[40px] h-[40px] flex justify-center items-center rounded-full bg-appColor'
          >
            <FaPlus className='mx-auto text-white text-lg text-center' />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PlanList;
