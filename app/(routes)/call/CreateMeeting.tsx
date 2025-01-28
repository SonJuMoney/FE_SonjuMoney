'use client';

import { ButtonSmall } from '@/components/atoms/Buttons/ButtonSmall';
import { useToast } from '@/hooks/use-toast';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createMeeting } from '@/lib/call';

type CreateMeetingProps = {
  calleeId: string;
};

const CreateMeeting = ({ calleeId }: CreateMeetingProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const client = useStreamVideoClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [values, _] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });

  const { toast } = useToast();

  const handleCreateMeeting = async () => {
    if (!client || !session?.user?.userId) return;

    try {
      const callId = await createMeeting({
        client,
        userId: session.user.userId.toString(),
        calleeId,
        description: values.description,
      });

      if (!values.description) {
        router.push(`/call/${callId}`);
      }
    } catch (error) {
      console.error(error);
      toast({ title: '화상통화에 실패하였습니다' });
    }
  };

  return (
    <ButtonSmall
      onClick={handleCreateMeeting}
      text='화상통화 걸기'
      active={true}
      className='bg-white'
    />
  );
};

export default CreateMeeting;
