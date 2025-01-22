'use server';

import { redirect } from 'next/navigation';
import { fetchData } from './fetchData';

export async function sendResponse(formData: FormData) {
  const message = formData.get('message') as string;
  const file = formData.get('file') as File;
  const allowanceId = formData.get('allowanceId') as string;
  const toId = formData.get('toId') as string;

  const newFormData = new FormData();

  newFormData.append('files', file);

  // data 객체 생성 및 추가
  const data = {
    message: message,
    family_id: Number(formData.get('family_id')),
    allowance_id: allowanceId,
    to_id: toId,
  };
  newFormData.append(
    'data',
    new Blob([JSON.stringify(data)], {
      type: 'application/json',
    })
  );
  console.log('newFormData', newFormData);

  const options: RequestInit = {
    method: 'POST',
    body: newFormData,
  };

  const response = await fetchData(
    '/allowances/response',
    'POST',
    options,
    undefined,
    true
  );

  if (!response.ok) {
    throw new Error('Failed to submit response');
  }

  return response.json();
}

// 서버 액션 생성
export async function skipToHome() {
  redirect('/home');
}
