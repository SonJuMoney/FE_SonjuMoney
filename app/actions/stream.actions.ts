'use server';

import { StreamClient } from '@stream-io/node-sdk';
import { auth } from '@/lib/auth';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user?.userId) throw new Error('User is not logged in');
  if (!apiKey) throw new Error('No API Key');
  if (!apiSecret) throw new Error('No API Secret');

  const client = new StreamClient(apiKey, apiSecret);
  const validity = 24 * 60 * 60;
  const currentTime = Math.floor(Date.now() / 1000);

  const token = client.generateUserToken({
    user_id: user.userId,
    validity_in_seconds: validity,
    iat: currentTime - 60,
  });

  return token;
};
