'use client';

import AlarmList from '@/components/molecules/Lists/AlarmList';
import { TAlarm } from '@/types/Alarm';

const Feed = () => {
  const list: TAlarm[] = [
    {
      alarm_id: 1,
      status: 'RECEIVED',
      alarm_type: 'ALLOWANCE',
      message: '할아버지께서 용돈을 보내주셨어요.',
      link_id: 1,
      created_at: '2025-01-14T11:44:30.327959',
    },
    {
      alarm_id: 2,
      status: 'RECEIVED',
      alarm_type: 'THANKS',
      message: '보내신 용돈의 답장이 왔어요.',
      link_id: 1,
      created_at: '2024-01-09',
    },
    {
      alarm_id: 3,
      status: 'CHECKED',
      alarm_type: 'INVITE',
      message: '엄마님이 가족 초대를 요청했어요.',
      link_id: 4,
      created_at: '2024-01-13',
    },
    {
      alarm_id: 4,
      status: 'CHECKED',
      alarm_type: 'OTHERS',
      message: '2025.02.13 디지털 하나로 수료',
      link_id: 5,
      created_at: '2024-01-25',
    },
  ];
  return (
    <>
      <AlarmList list={list}></AlarmList>
    </>
  );
};

export default Feed;
