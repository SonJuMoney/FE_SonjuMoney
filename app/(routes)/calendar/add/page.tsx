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
import { useToast } from '@/hooks/use-toast';
import { useEventApi } from '@/hooks/useEventApi/useEventApi';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { TMember } from '@/types/Family';
import { setHours, setMinutes } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProfileImage } from '@/lib/utils';

const categories: { value: string; type: string; color: string }[] = [
  { value: 'BIRTHDAY', type: '생일', color: 'lemon' },
  { value: 'MEMORIAL', type: '기념일', color: 'peach' },
  { value: 'DINING', type: '약속', color: 'skyBlue' },
  { value: 'TRAVEL', type: '여행', color: 'lavendar' },
  { value: 'OTHER', type: '기타', color: 'brown' },
];

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
  const router = useRouter();
  const { toast } = useToast();
  const { setEvent } = useEventApi();
  const { selectedFamily } = useSelectedFamilyStore();
  const { getFamilyMembers } = useFamilyApi();
  const [familyMembers, setFamilyMembers] = useState<TMember[]>([]);

  const [selectedType, setSelectedType] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [isAllday, setIsAllday] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [eventMembers, setEventMembers] = useState<number[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (selectedFamily) {
        const response = await getFamilyMembers(
          selectedFamily?.family_id,
          'ALL'
        );
        setFamilyMembers(response.members);
      }
    };

    fetchMembers();
  }, []);

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    // 시작일이 변경되면 종료일도 같은 날짜로 설정
    setEndDate(date);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const validateInputs = () => {
    if (!selectedType) {
      toast({ title: '분류를 선택해주세요.' });
      return false;
    }

    if (!title.trim()) {
      toast({ title: '제목을 입력해주세요.' });
      return false;
    }

    if (!startDate || !endDate) {
      toast({ title: '시작일과 종료일을 모두 선택해주세요.' });
      return false;
    }

    if (!eventMembers || eventMembers.length === 0) {
      toast({ title: '최소 한 명 이상의 구성원을 선택해주세요.' });
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isAllday) {
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
    }

    if (start > end) {
      toast({ title: '종료일이 시작일보다 앞설 수 없습니다.' });
      return false;
    }

    return true;
  };

  const handleEventMembers = (memberId: number) => {
    setEventMembers((prevMembers) => {
      if (prevMembers.includes(memberId)) {
        return prevMembers.filter((id) => id !== memberId);
      } else {
        return [...prevMembers, memberId];
      }
    });
  };

  const isMemberSelected = (memberId: number) => {
    return eventMembers.includes(memberId);
  };

  const handleOnClick = async () => {
    if (!validateInputs()) {
      return;
    }

    if (selectedFamily) {
      const eventData = JSON.stringify({
        event_category: selectedType,
        event_name: title,
        start_date_time: setMinutes(
          setHours(startDate!, startDate!.getHours() + 9),
          startDate!.getMinutes()
        ).toISOString(),
        end_date_time: setMinutes(
          setHours(endDate!, endDate!.getHours() + 9),
          endDate!.getMinutes()
        ).toISOString(),
        event_participants: eventMembers,
        all_day_status: isAllday ? 'ALL_DAY' : 'SPECIFIC_TIME',
      });
      const response = await setEvent(selectedFamily?.family_id, eventData);

      if (!response) {
        console.log('일정 추가 실패');
        return;
      }

      toast({ title: '일정이 등록되었습니다' });
      router.push('/calendar');
    }
  };

  return (
    <>
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
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {SelectTypeComponent(category.type, category.color)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('제목')}
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                placeholder='제목 입력 (30자 이내)'
                className='w-3/5'
                maxLength={30}
              />
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('하루 종일')}
              <Switch checked={isAllday} onCheckedChange={setIsAllday} />
            </div>
            <div className='flex justify-between items-center'>
              {TitleComponent('시작일')}
              {isAllday ? (
                <DatePickerDemo
                  date={startDate}
                  setDate={handleStartDateChange}
                />
              ) : (
                <DateTimePicker
                  date={startDate}
                  setDate={handleStartDateChange}
                />
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
            <div className='flex flex-col space-y-6'>
              {TitleComponent('참여자')}
              <div className='grid grid-cols-4 gap-4'>
                {familyMembers.map((member) => (
                  <div
                    key={member.member_id}
                    className='flex flex-col items-center gap-4'
                    onClick={() => handleEventMembers(member.member_id)}
                  >
                    <div
                      className={`w-14 h-14 border rounded-full overflow-hidden ${
                        isMemberSelected(member.member_id)
                          ? 'border-appColor'
                          : ''
                      }`}
                    >
                      <Image
                        src={
                          member.profile_link ??
                          getProfileImage(member.member_role)
                        }
                        width={30}
                        height={30}
                        alt={member.member_name}
                        className={`w-full h-full object-cover  `}
                      />
                    </div>
                    <div className='flex justify-between items-center space-x-2'>
                      <div
                        className={`relative w-4 h-4 border rounded-full cursor-pointer ${
                          isMemberSelected(member.member_id)
                            ? 'bg-appColor'
                            : ''
                        }`}
                      >
                        <div
                          className={`absolute w-[6px] h-[6px] z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-full bg-white`}
                        ></div>
                      </div>

                      <span
                        className={`text-sm font-medium ${
                          isMemberSelected(member.member_id)
                            ? 'text-appColor'
                            : ''
                        }`}
                      >
                        {member.member_name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ButtonLarge text={'저장'} onClick={handleOnClick} />
        </div>
      </div>
    </>
  );
};

export default AddPlan;
