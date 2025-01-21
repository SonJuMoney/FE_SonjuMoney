'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';

type IncomingCallModalProps = {
  callerId: string;
  callId: string;
  onAccept: () => void;
  onReject: () => void;
};

const IncomingCallModal = ({
  callerId,
  callId,
  onAccept,
  onReject,
}: IncomingCallModalProps) => {
  const [open, setOpen] = useState(true);
  const client = useStreamVideoClient();

  const handleAccept = async () => {
    setOpen(false);
    onAccept();
  };

  const handleReject = async () => {
    setOpen(false);
    onReject();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>수신 전화</DialogTitle>
          <DialogDescription>
            {callerId}님이 화상통화를 요청하였습니다
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex gap-2'>
          <Button
            onClick={handleAccept}
            className='bg-green-500 hover:bg-green-600'
          >
            수락
          </Button>
          <Button onClick={handleReject} variant='destructive'>
            거절
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IncomingCallModal;
