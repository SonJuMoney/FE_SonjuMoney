'use client';

import { ButtonSmall } from '@/components/atoms/Buttons/ButtonSmall';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CreateMeetingProps = {
  calleeId: string;
};

const CreateMeeting = ({ calleeId }: CreateMeetingProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const { toast } = useToast();

  const createMeeting = async () => {
    alert('clicked');
    if (!client && !session?.user) return;
    try {
      const meetingId = crypto.randomUUID();
      const call = client?.call('default', meetingId);
      if (!call) throw new Error('Failed to create call');

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';
      if (session?.user?.userId) {
        const strUserId = session?.user?.userId.toString();
        await call.getOrCreate({
          ring: true,
          data: {
            starts_at: startsAt,
            members: [
              { user_id: strUserId }, // 발신자
              { user_id: calleeId }, // 수신자
            ],
            custom: {
              description,
            },
          },
        });
        toast({ title: '화상통화가 연결되었어요' });
        if (!values.description) {
          router.push(`/call/${call.id}`);
        }
      }
    } catch (error) {
      console.error(error);
      alert('failed to creat meeting');
    }
  };

  return (
    <ButtonSmall
      onClick={() => createMeeting()}
      text='화상통화 걸기'
      active={true}
      className='bg-white'
    ></ButtonSmall>
  );
};

export default CreateMeeting;
