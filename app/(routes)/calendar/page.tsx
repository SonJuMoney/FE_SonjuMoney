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
import { LuPlus } from 'react-icons/lu';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, [currentMonth, selectedFamily]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);

      // 스크롤이 멈추면 버튼 표시
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  });

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
    <div className='h-full bg-[#FAE4D4]'>
      <div className='w-full'>
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
      {loading ? (
        <div></div>
      ) : selectedFamily ? (
        events.length > 0 ? (
          <div
            ref={scrollContainerRef}
            className='w-full h-[calc(100%-116px)] px-5 pb-[78px] overflow-y-auto scrollbar-hide'
          >
            {events?.map((date) => (
              <PlanCard
                key={date.current_date}
                date={date.current_date}
                day={date.current_day}
                events={date.events}
                isToday={date.current_date === today}
              />
            ))}
            <Link
              href='/calendar/add'
              className={`fixed bottom-[90px] right-5 z-50 flex items-center rounded-full bg-appColor text-white transition-all duration-300 ease-in-out p-3 ${
                isScrolling ? 'w-[48px]' : 'w-[120px]'
              } h-[48px]`}
            >
              <LuPlus
                className={`w-[24px] h-[24px] ${isScrolling ? '' : 'mr-2'}`}
              />
              <span
                className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                  isScrolling ? 'w-0 opacity-0' : 'w-auto opacity-100'
                }`}
              >
                일정 추가
              </span>
            </Link>
          </div>
        ) : (
          <div className='w-full h-[calc(100%-116px)] flex flex-col justify-center items-center px-5 pb-[78px]'>
            <EmptyState
              title='아직 등록된 일정이 없어요'
              subtitle={`가족 일정을 등록하고
서로 공유해보세요`}
              href='/calendar/add'
              buttonText='일정 등록하러가기'
            />
          </div>
        )
      ) : (
        <div className='w-full h-[calc(100%-116px)] flex flex-col justify-center items-center px-5 pb-[78px] '>
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
