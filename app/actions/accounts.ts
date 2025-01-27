'use server';

import type { MyAccount } from '@/types/Account';
import { fetchData } from './fetchData';

export async function getMyAccount(): Promise<MyAccount> {
  const baseUrl = '/accounts';
  return fetchData(baseUrl)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}
