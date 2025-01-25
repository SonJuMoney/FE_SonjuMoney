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

      if (session?.user?.userId) {
        await call.getOrCreate({
          ring: true, // 'ringing' 대신 'ring' 사용
          data: {
            starts_at: new Date().toISOString(),
            members: [
              {
                user_id: session.user.userId.toString(),
                role: 'host',
              },
              {
                user_id: calleeId,
                role: 'guest',
              },
            ],
            custom: {
              description: 'Instant meeting',
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
