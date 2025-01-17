'use client';

import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type DelayedNavigationProps = {
  session: Session | null;
  time: number;
  route?: string;
};

export function DelayedNavigation({
  session,
  time,
  route = '/home',
}: DelayedNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (session) {
        router.push(route);
      } else {
        router.push('/login');
      }
    }, time);

    return () => clearTimeout(timer);
  }, [session, router]);

  return null;
}
