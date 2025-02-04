'use server';

import type { SavingsResponse } from '@/types/Account';
import { fetchData } from './fetchData';

export async function getSavingsAccounts(): Promise<SavingsResponse> {
  const baseUrl = '/accounts/savings';
  return fetchData(baseUrl)
    .then((data) => {
      return data;
    })
    .catch(() => {
      return null;
    });
}
