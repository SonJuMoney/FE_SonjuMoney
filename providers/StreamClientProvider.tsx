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
    const user: User = {
      id: session.user?.userId?.toString() || '1',
      name: session.user.userName || '준용',
    };
    console.log('user in Stream Provider', user);

    const client = StreamVideoClient.getOrCreateInstance({
      apiKey,
      user,
      tokenProvider,
    });
    console.log('client', client);

    setVideoClient(client);
  }, [session?.user?.accessToken]);

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
