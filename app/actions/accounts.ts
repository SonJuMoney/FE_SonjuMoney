'use server';

import type { TAccount } from '@/types/Account';
import { fetchData } from './fetchData';

export async function getMyAccount(): Promise<TAccount> {
  const baseUrl = '/accounts';
  return fetchData(baseUrl);
}
