'use client';

import {
  CallControls,
  ParticipantView,
  CallingState,
  LoadingIndicator,
  useCallStateHooks,
  useCall,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MeetingRoom = () => {
  const router = useRouter();
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const { data: session } = useSession();
  const call = useCall();

  const participants = useParticipants();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <LoadingIndicator />;
  if (!session?.user?.userId) return <LoadingIndicator />;
  const currentUser = participants.find(
    (p) => p.userId === session?.user?.userId?.toString()
  );
  const otherUser = participants.find(
    (p) => p.userId !== session?.user?.userId?.toString()
  );
  const handleLeave = async () => {
    if (call) {
      // 마이크와 카메라 끄기
      await call.camera.disable();
      await call.microphone.disable();

      // 통화 종료 후 페이지 이동
      await call.leave();
      router.push('/call');
    }
  };
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      {otherUser && (
        <div className='h-full w-full'>
          <ParticipantView
            participant={otherUser}
            className='h-full w-full object-cover'
          />
        </div>
      )}
      {currentUser && (
        <div className='absolute top-14 right-4 x-50 h-[180px] w-[120px] overflow-hidden border-2 border-white shadow-lg'>
          <ParticipantView
            participant={currentUser}
            className='h-full w-full object-cover'
            trackType='videoTrack'
            mirror={true}
          />
        </div>
      )}
      <div className='fixed bottom-0 flex w-full  justify-center items-end gap-5p-4 overflow-x-scroll flex-wrap p-4 min-h-40'>
        <CallControls onLeave={handleLeave} />
      </div>
    </section>
  );
};

export default MeetingRoom;
