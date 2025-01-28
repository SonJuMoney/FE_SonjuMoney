'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const CallReceiver = () => {
  const client = useStreamVideoClient();
  const router = useRouter();
  const { data: session } = useSession();
  const [showDialog, setShowDialog] = useState(false);
  const [currentCall, setCurrentCall] = useState<Call | null>(null);
  const [callerName, setCallerName] = useState<string>('');
  const [rejectedCall, setRejectedCall] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;

    const unsubscribeRing = client.on('call.ring', async (event) => {
      if (event.call.created_by.id === session?.user?.userId?.toString()) {
        return;
      }

      const call = client.call('default', event.call.id);
      const caller = event.call.created_by.name || event.call.created_by.id;
      setCallerName(caller);
      setCurrentCall(call);
      setShowDialog(true);
    });

    const unsubscribeReject = client.on('call.rejected', async (event) => {
      if (event.call.created_by.id === session?.user?.userId?.toString()) {
        setRejectedCall(event.call.id);
        router.push('/call');
      }
    });

    return () => {
      unsubscribeRing();
      unsubscribeReject();
    };
  }, [client, session?.user?.userId]);

  const handleAccept = async () => {
    if (currentCall) {
      await currentCall.accept();
      setShowDialog(false);
      router.push(`/call/${currentCall.id}`);
    }
  };

  const handleReject = async () => {
    if (currentCall) {
      await currentCall.reject();
      setShowDialog(false);
    }
  };

  return (
    <>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className='flex flex-col items-center w-4/5 rounded-xl gap-10'>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p className='font-semibold'>{callerName}님의 전화</p>
            </AlertDialogTitle>
            <AlertDialogDescription className='space-y-2'>
              <p>수신 전화가 있습니다. 받으시겠습니까?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex justify-center w-full'>
            <AlertDialogCancel onClick={handleReject}>거절</AlertDialogCancel>
            <AlertDialogAction onClick={handleAccept}>수락</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {rejectedCall && (
        <AlertDialog open={true} onOpenChange={() => setRejectedCall(null)}>
          <AlertDialogContent className='flex flex-col items-center w-4/5 rounded-xl gap-10'>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <p className='font-semibold'>통화 거절됨</p>
              </AlertDialogTitle>
              <AlertDialogDescription className='space-y-2'>
                <p>상대방이 통화를 거절했습니다.</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className='flex justify-center w-full'>
              <AlertDialogAction onClick={() => setRejectedCall(null)}>
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
