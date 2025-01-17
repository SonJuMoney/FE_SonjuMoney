'use server';

import { redirect } from 'next/navigation';
import { fetchData } from './fetchData';

export async function sendResponse(formData: FormData) {
  const message = formData.get('message') as string;
  const image = formData.get('image') as File;
  const allowanceId = formData.get('allowanceId') as string;
  const toId = formData.get('toId') as string;

  const response = await fetchData('/allowances/response', 'POST', {
    image,
    data: {
      to_id: Number(toId),
      allowance_id: Number(allowanceId),
      message,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to submit response');
  }

  return response.json();
}

// 서버 액션 생성
export async function skipToHome() {
  redirect('/home');
}
