'use server';

import type { TFamily } from '@/types/Family';
import { fetchData } from './fetchData';

export async function getFamilies(): Promise<TFamily[]> {
  const baseUrl = '/families';
  return fetchData(baseUrl)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return null;
    });
}
