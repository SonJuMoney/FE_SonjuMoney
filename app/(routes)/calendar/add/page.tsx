'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import { DatePickerDemo } from '@/components/ui/datePicker';
import { DateTimePicker } from '@/components/ui/dateTimePicker';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useEffect, useRef, useState } from 'react';

const TitleComponent = (title: string) => {
  return (
    <div className='flex space-x-4 items-center'>
      <div className='w-[10px] h-[10px] bg-appColor rounded-full'></div>
      <div className='text-lg font-medium'>{title}</div>
    </div>
  );
};

const SelectTypeComponent = (type: string, color: string) => {
  return (
    <div className='flex items-center gap-4'>
      <div className={`w-5 h-5 rounded-full bg-${color}`}></div>
      <div>{type}</div>
    </div>
  );
};

const AddPlan = () => {
  const titleRef = useRef(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [isAllday, setIsAllday] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    console.log(selectedType);
  }, [selectedType]);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleOnClick = () => {};

  return (
    <div className='pageLayout'>
      <Header title='일정 추가' />
      <div className='h-full px-5 pt-10 pb-5 flex flex-col justify-between'>
        <div className='flex flex-col space-y-12'>
          <div className='flex justify-between items-center'>
            {TitleComponent('분류')}
            <Select onValueChange={handleTypeChange} value={selectedType}>
              <SelectTrigger className='w-[120px]'>
                <SelectValue placeholder='분류 선택' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='BIRTHDAY'>
                  {SelectTypeComponent('생일', 'lemon')}
                </SelectItem>
                <SelectItem value='MEMORIAL'>
                  {SelectTypeComponent('기념일', 'peach')}
                </SelectItem>
                <SelectItem value='DINING'>
                  {SelectTypeComponent('약속', 'skyBlue')}
                </SelectItem>
                <SelectItem value='TRAVEL'>
                  {SelectTypeComponent('여행', 'lavendar')}
                </SelectItem>
                <SelectItem value='OTHER'>
                  {SelectTypeComponent('기타', 'brown')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex justify-between items-center'>
            {TitleComponent('제목')}
            <Input
              ref={titleRef}
              type='text'
              placeholder='제목을 입력해주세요'
              className='w-3/5'
            />
          </div>
          <div className='flex justify-between items-center'>
            {TitleComponent('하루 종일')}
            <Switch checked={isAllday} onCheckedChange={setIsAllday} />
          </div>
          <div className='flex justify-between items-center'>
            {TitleComponent('시작일')}
            {isAllday ? (
              <DatePickerDemo date={startDate} setDate={setStartDate} />
            ) : (
              <DateTimePicker date={startDate} setDate={setStartDate} />
            )}
          </div>
          <div className='flex justify-between items-center'>
            {TitleComponent('종료일')}
            {isAllday ? (
              <DatePickerDemo date={endDate} setDate={setEndDate} />
            ) : (
              <DateTimePicker date={endDate} setDate={setEndDate} />
            )}
          </div>
          <div className='flex justify-between items-center'>
            {TitleComponent('구성원')}
          </div>
        </div>
        <ButtonLarge text={'저장'} onClick={handleOnClick} />
      </div>
    </div>
  );
};

export default AddPlan;
