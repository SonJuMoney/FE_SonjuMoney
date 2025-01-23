'use client';

import { buttonVariants } from '@/components/ui/button';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/shadcn';

interface MonthSelectorProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onMonthClick: () => void;
}

const MonthSelector = ({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  onMonthClick,
}: MonthSelectorProps) => {
  return (
    <div className='px-5'>
      <div className='w-full relative flex items-center justify-center py-5'>
        <div
          className='text-lg font-semibold cursor-pointer'
          aria-live='polite'
          role='presentation'
          id='month-picker'
          onClick={onMonthClick}
        >
          {format(currentMonth, 'yyyy년 MM월', { locale: ko })}
        </div>
        <div className='flex items-center space-x-1'>
          <button
            name='previous-month'
            aria-label='이전 달로 이동'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              'absolute left-1'
            )}
            type='button'
            onClick={onPreviousMonth}
          >
            <ChevronLeft className='h-4 w-4' />
          </button>
          <button
            name='next-month'
            aria-label='다음 달로 이동'
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              'absolute right-1 disabled:bg-slate-100'
            )}
            type='button'
            onClick={onNextMonth}
          >
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthSelector;
