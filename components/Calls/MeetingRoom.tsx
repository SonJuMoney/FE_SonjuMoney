'use client';

import { useToast } from '@/hooks/use-toast';
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
import { useEffect } from 'react';
import TopicTicker from './TopicTicker';

const MeetingRoom = () => {
  const router = useRouter();
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const { data: session } = useSession();
  const call = useCall();
  const { toast } = useToast();

  const participants = useParticipants();
  const callingState = useCallCallingState();

  // 3. 통화 종료 이벤트 핸들러
  useEffect(() => {
    if (!call) {
      console.log('call 없음', call);
      return;
    }

    if (call && callingState === CallingState.LEFT) {
      toast({ title: '통화를 종료했어요' });
      call.camera.disable();
      call.microphone.disable();
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => {
            track.stop();
            track.enabled = false;
          });
        });
      router.push('/call');
    }
  }, [callingState]);

  // 4. 통화 수동 종료 핸들러
  const handleLeave = () => {
    if (!call) return;

    try {
      call.camera.disable();
      call.microphone.disable();
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => {
            track.stop();
            track.enabled = false;
          });
        });
      call.endCall();
    } catch (error) {
      console.error('Call end error:', error);
    } finally {
      router.push('/call');
    }
  };

  if (callingState !== CallingState.JOINED) return <LoadingIndicator />;
  else if (!session?.user?.userId) return <LoadingIndicator />;
  else {
  }
  const currentUser = participants.find(
    (p) => p.userId === session?.user?.userId?.toString()
  );
  const otherUser = participants.find(
    (p) => p.userId !== session?.user?.userId?.toString()
  );

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
