import { StreamVideoClient } from '@stream-io/video-react-sdk';

type CreateMeetingParams = {
  client: StreamVideoClient | null;
  userId: string;
  calleeId: string;
  description?: string;
};

export const createMeeting = async ({
  client,
  userId,
  calleeId,
  description = 'Instant meeting',
}: CreateMeetingParams) => {
  if (!client) {
    throw new Error('Video client not initialized');
  }

  const meetingId = crypto.randomUUID();
  const call = client.call('default', meetingId);

  if (!call) {
    throw new Error('Failed to create call');
  }

  await call.getOrCreate({
    ring: true,
    data: {
      starts_at: new Date().toISOString(),
      members: [
        {
          user_id: userId,
          role: 'host',
        },
        {
          user_id: calleeId,
          role: 'guest',
        },
      ],
      custom: {
        description,
      },
    },
  });

  return call.id;
};
