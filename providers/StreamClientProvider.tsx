'use client';

import { tokenProvider } from '@/app/actions/stream.actions';
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;
    if (!apiKey) throw new Error('Stream API Key missing');
    console.log('session changed');
    const user: User = {
      id: session.user.id || '1',
      name: session.user.name || '준용',
      image: session.user.image || '',
    };
    console.log('user', user);
    const client = new StreamVideoClient({
      apiKey,
      user,
      tokenProvider,
    });

    setVideoClient(client);
  }, [session]);

  if (!videoClient) {
    return <>{children}</>;
  }

  return (
    <StreamVideo client={videoClient}>
      {/* <StreamCall call={call}><MyVideoUI /></StreamCall> */}
      {children}
    </StreamVideo>
  );
};
export default StreamVideoProvider;
