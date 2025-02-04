import { TAlarm } from '@/types/Alarm';

export const getAlarmRoute = (type: TAlarm['alarm_type'], linkId: number) => {
  const RouteMap = {
    ALLOWANCE: `/allowance/${linkId}`,
    CHILD_ALLOWANCE: `/allowance/${linkId}`,
    THANKS: '/feed',
    SAVINGS: '/savings/send/message',
    FEED: '/feed',
    INVITE: '가족 초대가 도착했어요',
    TRAVEL: `/calendar/detail/${linkId}`,
    BIRTHDAY: `/calendar/detail/${linkId}`,
    DINING: `/calendar/detail/${linkId}`,
    EVENT: `/calendar/detail/${linkId}`,
    MEMORIAL: `/calendar/detail/${linkId}`,
    OTHERS: `/calendar/detail/${linkId}`,
  };

  return RouteMap[type];
};

export const getAlarmMessage = (
  type: TAlarm['alarm_type'],
  message?: string
) => {
  const messageMap = {
    ALLOWANCE: '용돈이 도착했어요!',
    CHILD_ALLOWANCE: message,
    THANKS: '보내신 용돈의 답장이 왔어요!',
    SAVINGS: '적금 메세지를 작성해주세요!',
    FEED: '새로운 피드가 올라왔어요!',
    INVITE: '가족 초대가 도착했어요!',
    TRAVEL: '여행 일정이 다가오고 있어요!',
    BIRTHDAY: '내일은 우리 가족의 생일이에요!',
    DINING: '내일은 가족 외식이 있어요!',
    EVENT: '새로운 일정이 등록되었어요!',
    MEMORIAL: '내일은 가족 기념일이 있어요!',
    OTHERS: '새로운 일정이 등록되었어요!',
  };

  return messageMap[type];
};
