'use client';

import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import PlanCard from '@/components/molecules/Cards/PlanCard';
import EmptyState from '@/components/molecules/EmptyState/EmptyState';
import MonthSelector from '@/components/molecules/MonthSelector/MonthSelector';
import MonthPicker from '@/components/ui/monthPicker';
import { useEventApi } from '@/hooks/useEventApi/useEventApi';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { TEvent } from '@/types/Events';
import { add, format, sub } from 'date-fns';
import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
        const groupedEvents = groupEventsByDate(response);
        setEvents(groupedEvents);
      }
    };

    fetchEvents();
  }, [currentMonth, selectedFamily]);

  useEffect(() => {
    console.log(events);
  }, [events]);

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
          <MonthSelector
            currentMonth={currentMonth}
            onPreviousMonth={previousMonth}
            onNextMonth={nextMonth}
            onMonthClick={() => setShowMonthPicker(true)}
          />
        )}

        {showMonthPicker && (
          <MonthPicker
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
            onChangePicker={setShowMonthPicker}
          />
        )}
      </div>
      {selectedFamily ? (
        <>
          {events.length > 0 ? (
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
                  className='w-[105px] h-[40px] flex justify-center space-x-1 items-center rounded-full bg-appColor text-white'
                >
                  <FaPlus className='text-white text-lg text-center' />
                  <div>일정 추가</div>
                </Link>
              </div>
            </div>
          ) : (
            <div className='h-full flex flex-col justify-center items-center px-5 '>
              <EmptyState
                title='아직 등록된 일정이 없어요'
                subtitle={`가족 일정을 등록하고
서로 공유해보세요`}
                href='/calendar/add'
                buttonText='일정 등록하러가기'
              />
            </div>
          )}
        </>
      ) : (
        <div className='h-full flex flex-col justify-center items-center px-5 '>
          <EmptyState
            title='아직 소속된 가족이 없어요'
            subtitle={`가족을 생성하고
소식을 주고 받아보세요!`}
          />
        </div>
      )}
    </div>
  );
};
export default PlanList;
