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
import Boy from '@/public/Avatar/boy.png';
import Dad from '@/public/Avatar/dad.png';
import Girl from '@/public/Avatar/girl.png';
import Grandma from '@/public/Avatar/grandma.png';
import Grandpa from '@/public/Avatar/grandpa.png';
import Mom from '@/public/Avatar/mom.png';
import DefaultProfile from '@/public/Default_Profile.svg';
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
    EVENT: OTHERS,
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
      return Grandpa;
    case '할머니':
      return Grandma;
    case '아빠':
      return Dad;
    case '엄마':
      return Mom;
    case '아들':
      return Boy;
    case '딸':
      return Girl;
    default:
      return DefaultProfile;
  }
};

export const getParentProfileImage = (gender: 'FEMALE' | 'MALE') => {
  switch (gender) {
    case 'FEMALE':
      return '/Avatar/mom.png';
    case 'MALE':
      return '/Avatar/dad.png';
  }
};

export const getChildProfileImage = (gender: 'FEMALE' | 'MALE') => {
  switch (gender) {
    case 'FEMALE':
      return '/Avatar/girl.png';
    case 'MALE':
      return '/Avatar/boy.png';
  }
};

export const getBankImage = () => {
  return '/BankImage/Hana.jpg';
};
