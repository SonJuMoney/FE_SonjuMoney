'use server';

import { redirect } from 'next/navigation';
import { fetchData } from './fetchData';

export async function sendResponse(formData: FormData) {
  const message = formData.get('message') as string;
  const file = formData.get('file') as File;
  const allowanceId = formData.get('allowanceId') as string;

  const newFormData = new FormData();

  newFormData.append('file', file);

  // data 객체 생성 및 추가
  const data = {
    message: message,
  };
  newFormData.append(
    'data',
    new Blob([JSON.stringify(data)], {
      type: 'application/json',
    })
  );

  const options: RequestInit = {
    method: 'POST',
    body: newFormData,
  };

  const response = await fetchData(
    `/allowances/${allowanceId}/thanks`,
    options,
    undefined,
    true
  );

  if (response.code !== 200) {
    throw new Error('Failed to submit response');
  }

  return response.code === 200;
}

// 서버 액션 생성
export async function skipToHome() {
  redirect('/home');
}
