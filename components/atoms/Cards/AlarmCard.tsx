import ArrowRight from '@/public/Icons/arrowRight_20.svg';
import { TAlarm } from '@/types/Alarm';
import Image from 'next/image';
import { getAlarmImage } from '@/lib/utils';

const AlarmCard = (data: TAlarm) => {
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

  // const getAlarmRoute = (type: TAlarm['alarm_type']) => {
  //   const RouteMap = {
  //     ALLOWANCE: '용돈이 도착했어요!',
  //     THANKS: '보내신 용돈의 답장이 왔어요',
  //     SAVINGS: '적금 메세지를 작성해주세요',
  //     FEED: '새로운 피드가 올라왔어요',
  //     INVITE: '가족 초대가 도착했어요',
  //     TRAVEL: '여행 일정이 다가오고 있어요',
  //     BIRTHDAY: '내일은 우리 가족의 생일이에요',
  //     DINING: '내일은 가족 외식이 있어요',
  //     MEMORIAL: '내일은 가족 기념일이 있어요',
  //     OTHERS: '새로운 일정이 등록되었어요',
  //   };

  //   return RouteMap[type];
  // };

  return (
    <div className='flex justify-between items-center w-full bg-white rounded-[16px] p-5 border '>
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
