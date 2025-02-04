'use client';

import { CallReceiver } from '@/app/(routes)/call/CallReceiver';
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
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user || !apiKey) return;

    const user: User = {
      id: session.user?.userId?.toString() || '',
      name: session.user.userName || '',
    };

    const newClient = new StreamVideoClient({
      apiKey,
      user,
      tokenProvider: async () => {
        const token = await tokenProvider();
        return token;
      },
    });

    setClient(newClient);

    return () => {
      newClient.disconnectUser();
    };
  }, [session?.user]);

  if (!client) {
    return <>{children}</>;
  }

  return (
    <StreamVideo client={client}>
      <CallReceiver />
      {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;
