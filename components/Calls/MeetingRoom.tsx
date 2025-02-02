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
import { useCallback, useEffect } from 'react';
import TopicTicker from './TopicTicker';

const MeetingRoom = () => {
  const router = useRouter();
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const { data: session } = useSession();
  const call = useCall();

  const participants = useParticipants();
  const callingState = useCallCallingState();

  // 1. 장치 강제 종료 로직
  const forceDisableDevices = useCallback(async () => {
    if (!call) return;
    try {
      const mediaDevices = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaDevices.getTracks().forEach((track) => track.stop());
      await Promise.allSettled([
        call.camera.disable(),
        call.microphone.disable(),
      ]);
    } catch (error) {
      console.error('Device disable error:', error);
    }
  }, [call]);

  // 2. 페이지 언로드 시 처리
  useEffect(() => {
    window.addEventListener('beforeunload', forceDisableDevices);
    return () => {
      window.removeEventListener('beforeunload', forceDisableDevices);
    };
  }, [forceDisableDevices]);

  // 3. 통화 종료 이벤트 핸들러
  useEffect(() => {
    if (!call) return;

    const handleCallEnded = async () => {
      await forceDisableDevices();
      router.push('/call');
    };

    call.on('call.ended', handleCallEnded);
    return () => call.off('call.ended', handleCallEnded);
  }, [call, router, forceDisableDevices]);

  // 4. 통화 수동 종료 핸들러
  const handleLeave = useCallback(async () => {
    if (!call) return;

    try {
      // 장치 비활성화 먼저 수행
      await forceDisableDevices();

      // 통화 완전 종료
      await call.endCall();

      // 상태 갱신을 위한 딜레이 추가
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Call end error:', error);
    } finally {
      router.push('/call');
    }
  }, [call, router, forceDisableDevices]);

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
