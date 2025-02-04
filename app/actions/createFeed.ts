'use server';

import { fetchData } from './fetchData';

export async function createFeed(formData: FormData) {
  // FormData 객체 새로 생성
  const newFormData = new FormData();

  // 파일들 추가
  const files = formData.getAll('file');
  files.forEach((file) => {
    newFormData.append('files', file);
  });

  // data 객체 생성 및 추가
  const data = {
    message: formData.get('message'),
    family_id: Number(formData.get('family_id')),
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

  const response = await fetchData('/feeds', options, undefined, true);
  if (response.code !== 200) {
    throw new Error('Failed to submit response');
  }

  return response;
}
