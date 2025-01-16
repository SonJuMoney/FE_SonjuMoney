'use client';

import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type DelayedNavigationProps = {
  session: Session | null;
};

export function DelayedNavigation({ session }: DelayedNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (session) {
        router.push('/home');
      } else {
        router.push('/login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [session, router]);

  return null;
}
