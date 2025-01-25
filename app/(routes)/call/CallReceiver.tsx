'use client';

import {
  StreamCall,
  StreamVideo,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const CallReceiver = () => {
  const client = useStreamVideoClient();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!client) return;

    const unsubscribe = client.on('call.ring', async (event) => {
      // 발신자와 수신자 구분
      if (event.call.created_by.id === session?.user?.userId?.toString()) {
        return; // 발신자인 경우 알림창을 표시하지 않음
      }

      const call = client.call('default', event.call.id);
      const answer = window.confirm('수신 전화가 있습니다. 받으시겠습니까?');

      if (answer) {
        await call.accept();
        router.push(`/call/${call.id}`);
      } else {
        await call.reject();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [client, session?.user?.userId]);

  return null;
};
