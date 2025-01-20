'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {};

const CreateMeeting = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client && !session?.user) return;
    try {
      const meetingId = crypto.randomUUID();
      const call = client?.call('default', meetingId);
      if (!call) throw new Error('Failed to create call');

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      toast({ title: '화상통화가 연결되었어요' });
      if (!values.description) {
        router.push(`/call/${call.id}`);
      }
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  return (
    <div>
      <Button onClick={createMeeting}>create Meeting</Button>
    </div>
  );
};

export default CreateMeeting;
