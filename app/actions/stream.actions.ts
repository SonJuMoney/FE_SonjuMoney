'use server';

import { StreamClient } from '@stream-io/node-sdk';
import { auth } from '@/lib/auth';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const session = await auth();
  const user = session?.user;
  console.log('apiKey', apiKey);

  console.log('apiSecret', apiSecret);

  if (!user?.accessToken) throw new Error('User is not logged in');
  if (!apiKey) throw new Error('No API Key');
  if (!apiSecret) throw new Error('No API Secret');

  const client = new StreamClient(apiKey, apiSecret);
  const validity = 24 * 60 * 60;
  const token = client.generateUserToken({
    user_id: user.accessToken,
    validity_in_seconds: validity,
  });
  console.log(token);

  return token;
};
