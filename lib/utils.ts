import TRAVEL from '@/public/AnimatedIcons/Airplane.png';
import MEMORIAL from '@/public/AnimatedIcons/Bear.png';
import BIRTHDAY from '@/public/AnimatedIcons/Birthday.png';
import OTHERS from '@/public/AnimatedIcons/Calendar.png';
import FEED from '@/public/AnimatedIcons/Camera.png';
import INVITE from '@/public/AnimatedIcons/Family.png';
import DINING from '@/public/AnimatedIcons/Food.png';
import ALLOWANCE from '@/public/AnimatedIcons/HeartRibbon.png';
import THANKS from '@/public/AnimatedIcons/LoveLetter.png';
import SAVINGS from '@/public/AnimatedIcons/Memo.png';
import { TAlarm } from '@/types/Alarm';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAlarmImage = (type: TAlarm['alarm_type']) => {
  const imageMap = {
    ALLOWANCE: ALLOWANCE,
    THANKS: THANKS,
    SAVINGS: SAVINGS,
    FEED: FEED,
    INVITE: INVITE,
    TRAVEL: TRAVEL,
    BIRTHDAY: BIRTHDAY,
    DINING: DINING,
    MEMORIAL: MEMORIAL,
    OTHERS: OTHERS,
  };

  return imageMap[type];
};

export const formatUpdatedAt = (updatedAt: string): string => {
  const now = new Date();
  const savedAt = new Date(updatedAt);

  const timeDiff = now.getTime() - savedAt.getTime();
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (minutesDiff < 1) {
    return '방금';
  } else if (minutesDiff < 60) {
    return `${minutesDiff}분 전`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}시간 전`;
  } else if (daysDiff < 7) {
    return `${daysDiff}일 전`;
  } else {
    const year = savedAt.getFullYear();
    const month = (savedAt.getMonth() + 1).toString().padStart(2, '0');
    const day = savedAt.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
};

export const getProfileImage = (role: string) => {
  switch (role) {
    case '할아버지':
      return '/Avatar/grandpa.png';
    case '할머니':
      return '/Avatar/grandma.png';
    case '아빠':
      return '/Avatar/dad.png';
    case '엄마':
      return '/Avatar/mom.png';
    case '아들':
      return '/Avatar/boy.png';
    case '딸':
      return '/Avatar/girl.png';
  }
};
