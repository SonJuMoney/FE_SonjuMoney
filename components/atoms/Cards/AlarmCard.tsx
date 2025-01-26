'use client';

import { useAlarmApi } from '@/hooks/useAlarmApi/useAlarmApi';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import { useNotification } from '@/providers/NotificationProvider';
import ArrowRight from '@/public/Icons/arrowRight_20.svg';
import { useSelectedFamilyStore } from '@/store/useSelectedFamilyStore';
import { TAlarm } from '@/types/Alarm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAlarmImage } from '@/lib/utils';

const AlarmCard = ({ data }: { data: TAlarm }) => {
  const { readAlarm } = useAlarmApi();
  const { removeNotification } = useNotification();
  const { setSelectedFamily, familyList } = useSelectedFamilyStore();

  const { getFamilies } = useFamilyApi();
  useEffect(() => {
    const fetchFamilies = async () => {
      const response = await getFamilies();
      if (response.length > 0) {
        setSelectedFamily(response[0]);
      }
    };
    fetchFamilies();
  }, []);

  const getAlarmMessage = (type: TAlarm['alarm_type']) => {
    const messageMap = {
      ALLOWANCE: '용돈이 도착했어요!',
      THANKS: '보내신 용돈의 답장이 왔어요!',
      SAVINGS: '적금 메세지를 작성해주세요!',
      FEED: '새로운 피드가 올라왔어요!',
      INVITE: '가족 초대가 도착했어요!',
      TRAVEL: '여행 일정이 다가오고 있어요!',
      BIRTHDAY: '내일은 우리 가족의 생일이에요!',
      DINING: '내일은 가족 외식이 있어요!',
      MEMORIAL: '내일은 가족 기념일이 있어요!',
      OTHERS: '새로운 일정이 등록되었어요!',
    };

    return messageMap[type];
  };

  const getAlarmRoute = (type: TAlarm['alarm_type'], linkId: number) => {
    const RouteMap = {
      ALLOWANCE: `/allowance/${linkId}`,
      THANKS: '/feed',
      SAVINGS: '/savings/send/message',
      FEED: '/feed',
      // 초대 받기 개발 필요
      INVITE: '가족 초대가 도착했어요',
      TRAVEL: `/calendar/detail/${linkId}`,
      BIRTHDAY: `/calendar/detail/${linkId}`,
      DINING: `/calendar/detail/${linkId}`,
      MEMORIAL: `/calendar/detail/${linkId}`,
      OTHERS: `/calendar/detail/${linkId}`,
    };

    return RouteMap[type];
  };

  const router = useRouter();
  const onReadAlarm = (alarm_id: number, link_id: number) => {
    if (data.family_id) {
      setSelectedFamily(
        familyList.filter((family) => family.family_id === data.family_id)[0]
      );
    }
    if (data.alarm_type === 'INVITE') {
    }
    removeNotification(alarm_id);
    readAlarm(alarm_id);
    router.push(getAlarmRoute(data.alarm_type, link_id));
  };

  return (
    <div
      className='flex justify-between items-center w-full text-white  rounded-[16px] p-5 bg-appColor  border-2 border-white animate-pulse '
      onClick={() => onReadAlarm(data.alarm_id, data.link_id)}
    >
      <div className='flex justify-between items-center gap-5 max-w-[280px] whitespace-pre-wrap'>
        <Image
          src={data.alarm_type ? getAlarmImage(data.alarm_type) : ''}
          width={45}
          height={45}
          alt='Alarm Image'
        />
        <span className='font-semibold text-[17px]'>
          {getAlarmMessage(data.alarm_type)}
        </span>
      </div>
      <ArrowRight></ArrowRight>
    </div>
  );
};

export default AlarmCard;
