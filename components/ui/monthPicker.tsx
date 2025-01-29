import { buttonVariants } from '@/components/ui/button';
import {
  add,
  eachMonthOfInterval,
  endOfYear,
  format,
  isEqual,
  parse,
  startOfMonth,
  startOfToday,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/shadcn';

function getStartOfCurrentMonth() {
  return startOfMonth(startOfToday());
}

interface MonthPickerProps {
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
  onChangePicker: (value: boolean) => void;
}

export default function MonthPicker({
  currentMonth,
  onMonthChange,
  onChangePicker,
}: MonthPickerProps) {
  const [currentYear, setCurrentYear] = React.useState(
    format(currentMonth, 'yyyy')
  );
  const firstDayCurrentYear = parse(currentYear, 'yyyy', new Date());

  const months = eachMonthOfInterval({
    start: firstDayCurrentYear,
    end: endOfYear(firstDayCurrentYear),
  });

  function previousYear() {
    const firstDayNextYear = add(firstDayCurrentYear, { years: -1 });
    setCurrentYear(format(firstDayNextYear, 'yyyy'));
  }

  function nextYear() {
    const firstDayNextYear = add(firstDayCurrentYear, { years: 1 });
    setCurrentYear(format(firstDayNextYear, 'yyyy'));
  }

  return (
    <div className='px-5 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
      <div className='relative'>
        <div className='relative flex items-center justify-center py-5'>
          <div
            className='text-lg font-semibold'
            aria-live='polite'
            role='presentation'
            id='month-picker'
          >
            {format(firstDayCurrentYear, 'yyyy')}년
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
              onClick={previousYear}
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
              onClick={nextYear}
            >
              <ChevronRight className='h-4 w-4' />
            </button>
          </div>
        </div>
        <div
          className='absolute top-[68px] grid w-full grid-cols-3 gap-2 py-2 bg-white border-2 rounded-lg'
          role='grid'
          aria-labelledby='month-picker'
        >
          {months.map((month) => (
            <div
              key={month.toString()}
              className='relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-800'
              role='presentation'
            >
              <button
                name='day'
                className={cn(
                  'inline-flex h-9 w-16 items-center justify-center rounded-md p-0 text-sm font-normal ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-800',
                  isEqual(month, currentMonth) &&
                    'bg-appColor text-slate-50 hover:bg-appColor hover:text-slate-50 focus:bg-appColor focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900',
                  !isEqual(month, currentMonth) &&
                    isEqual(month, getStartOfCurrentMonth()) &&
                    'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                )}
                role='gridcell'
                tabIndex={-1}
                type='button'
                onClick={() => {
                  onMonthChange(month);
                  onChangePicker(false);
                }}
              >
                <time dateTime={format(month, 'yyyy-MM-dd')}>
                  {format(month, 'MMM', { locale: ko })}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
