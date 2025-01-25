'use client';

import Alert from '@/components/Calls/Alert';
import MeetingRoom from '@/components/Calls/MeetingRoom';
import MeetingSetup from '@/components/Calls/MeetingSetup';
import { useGetCallById } from '@/hooks/useCallApi/useGetCallById';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const MeetingPage = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!session?.user || isCallLoading) return <Loader />;

  if (!call)
    return (
      <p className='text-center text-3xl font-bold text-white'>
        Call Not Found
      </p>
    );

  const notAllowed =
    call.type === 'invited' &&
    (!session?.user ||
      !call.state.members.find((m) => m.user.id === session?.user?.userId));

  if (notAllowed)
    return <Alert title='You are not allowed to join this meeting' />;

  return (
    <div className='flex flex-col h-full w-full text-black bg-slate-700'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  );
};

export default MeetingPage;
