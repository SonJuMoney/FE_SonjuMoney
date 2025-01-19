'use server';

import { redirect } from 'next/navigation';
import { fetchData } from './fetchData';

export async function createFeed(formData: FormData) {
  const message = formData.get('message') as string;
  const images = formData.getAll('image') as File[];
  const family_id = formData.get('family_id') as string;

  const response = await fetchData('/feeds', 'POST', {
    images: images,
    data: {
      family_id: Number(family_id),
      message,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to submit response');
  }

  return response.json();
}
