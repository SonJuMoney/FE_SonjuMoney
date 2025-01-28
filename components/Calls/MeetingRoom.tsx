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
import TopicTicker from './TopicTicker';

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
    if (!call) return;

    try {
      // 마이크와 카메라를 먼저 비활성화
      await Promise.all([call.camera.disable(), call.microphone.disable()]);

      // 통화 상태 확인
      if (call.state.callingState !== CallingState.LEFT) {
        await call.leave();
      }

      router.push('/call');
    } catch (error) {
      console.log('Error leaving call:', error);
      // 에러가 발생해도 페이지 이동은 수행
      router.push('/call');
    }
  };
  return (
    <section className='relative h-screen w-full overflow-hidden text-white'>
      <TopicTicker />
      {otherUser && (
        <div className='h-full w-full'>
          <ParticipantView
            participant={otherUser}
            className='h-full w-full object-cover'
          />
        </div>
      )}
      {currentUser && (
        <div className='absolute top-20 right-0 x-50 h-[180px] w-[120px] overflow-hidden border-2 border-white shadow-lg'>
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
