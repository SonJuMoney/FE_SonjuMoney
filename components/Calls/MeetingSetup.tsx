'use client';

import {
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import Alert from './Alert';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt } = useCallStateHooks();
  const callEndedAt = useCallEndedAt();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.'
    );
  }

  useEffect(() => {
    call.camera.enable();
    call.microphone.enable();
  }, [call.camera, call.microphone]);

  if (callHasEnded)
    return (
      <Alert
        title='The call has been ended by the host'
        iconUrl='/icons/call-ended.svg'
      />
    );

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-white bg-slate-800'>
      <h1 className='text-center text-2xl font-bold'>화상통화 설정하기</h1>
      <VideoPreview />
      <Button
        className='rounded-md bg-green-500 px-4 py-2.5'
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        화상통화하기
      </Button>
    </div>
  );
};

export default MeetingSetup;
