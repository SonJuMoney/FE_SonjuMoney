'use client';

import CallOff from '@/public/Icons/callOff_24.svg';
import CallOn from '@/public/Icons/callOn_24.svg';
import FeedOff from '@/public/Icons/feedOff_24.svg';
import FeedOn from '@/public/Icons/feedOn_24.svg';
import HomeOff from '@/public/Icons/homeOff_24.svg';
import HomeOn from '@/public/Icons/homeOn_24.svg';
import {
  BsCalendarHeart as CalendarOff,
  BsCalendarHeartFill as CalendarOn,
} from 'react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BOTTOM_NAV_ITEM_DATA, BOTTOM_NAV_PATH_INFO } from './BottomNavUtils';

const BottomNav = () => {
  const pathname = usePathname();
  const isOpen = useMemo(() => {
    return BOTTOM_NAV_PATH_INFO[pathname];
  }, [pathname]);

  const getIcon = (path: string, isActive: boolean) => {
    switch (path) {
      case '/home':
        return isActive ? <HomeOn /> : <HomeOff />;
      case '/feed':
        return isActive ? <FeedOn /> : <FeedOff />;
      case '/calendar':
        return isActive ? (
          <CalendarOn color='#FF9100' size={22} />
        ) : (
          <CalendarOff color='#AEB5BC' size={22} />
        );
      case '/call':
        return isActive ? <CallOn /> : <CallOff />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0  flex py-3 justify-evenly  bg-white/80 backdrop-blur-xl border-2 border-white  border-t rounded-t-3xl transition-all duration-300 ease-in-out z-50 ${
        isOpen ? 'visible opacity-100' : 'invisible opacity-0 -bottom-[50px]'
      }`}
    >
      {BOTTOM_NAV_ITEM_DATA.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className='flex flex-col items-center justify-center  gap-1 no-underline  w-[75px]'
        >
          {getIcon(
            item.path,
            pathname === item.path || pathname.includes(item.path)
          )}
          <span
            className={`text-md font-semibold ${
              pathname === item.path || pathname.includes(item.path)
                ? 'text-appColor'
                : 'text-placeHolder'
            }`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
