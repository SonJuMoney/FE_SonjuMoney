'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (
    type: 'hour' | 'minute' | 'ampm',
    value: string
  ) => {
    if (date) {
      const newDate = new Date(date);
      if (type === 'hour') {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
        );
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value));
      } else if (type === 'ampm') {
        const currentHours = newDate.getHours();
        newDate.setHours(
          value === '오후' ? currentHours + 12 : currentHours - 12
        );
      }
      setDate(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-3/5 justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            format(date, 'yyyy/MM/dd aa hh:mm', { locale: ko })
          ) : (
            <span>일시 선택</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full max-w-screen px-0' align='end'>
        <div className='flex'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className='flex flex-row h-[300px] divide-y-0 divide-x'>
            <ScrollArea className='w-auto'>
              <div className='flex flex-col p-1'>
                {['오전', '오후'].map((ampm) => (
                  <Button
                    key={ampm}
                    size='icon'
                    variant='ghost'
                    className={cn(
                      'w-full shrink-0 aspect-square',
                      date &&
                        ((ampm === '오전' && date.getHours() < 12) ||
                          (ampm === '오후' && date.getHours() >= 12))
                        ? 'bg-appColor text-white hover:bg-appColor hover:text-white'
                        : ''
                    )}
                    onClick={() => handleTimeChange('ampm', ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
            <ScrollArea className='w-auto'>
              <div className='flex flex-col p-1'>
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size='icon'
                    variant='ghost'
                    className={cn(
                      'sm:w-full shrink-0 aspect-square',
                      date && date.getHours() % 12 === hour % 12
                        ? 'bg-appColor text-white hover:bg-appColor hover:text-white'
                        : ''
                    )}
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='hidden' />
            </ScrollArea>
            <ScrollArea className='w-auto'>
              <div className='flex flex-col p-1'>
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                  <Button
                    key={minute}
                    size='icon'
                    variant='ghost'
                    className={cn(
                      'w-full shrink-0 aspect-square',
                      date && date.getMinutes() === minute
                        ? 'bg-appColor text-white hover:bg-appColor hover:text-white'
                        : ''
                    )}
                    onClick={() =>
                      handleTimeChange('minute', minute.toString())
                    }
                  >
                    {minute}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation='horizontal' className='hidden' />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
