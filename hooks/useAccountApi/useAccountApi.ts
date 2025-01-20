import { useApi } from '@/hooks/useApi';
import {
  TAccount,
  TSetAccountReq,
  TSetSavingsAccountReq,
} from '@/types/Account';

export const useAccountApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/accounts';

  // 계좌 등록
  const setAccount = async (accountData: TSetAccountReq): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(accountData),
    };
    const response = await fetchApi(`${baseUrl}`, options);

    return response.code === 200;
  };

  // 내 계좌 조회
  const getMyAccount = async (): Promise<TAccount> => {
    const response = await fetchApi(baseUrl);

    return response;
  };

  // 적금 계좌 생성
  const setSavingsAccount = async (
    savingsData: TSetSavingsAccountReq
  ): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(savingsData),
    };
    const response = await fetchApi(`${baseUrl}/savings`, options);

    console.log(response);
    return response.code === 200;
  };

  return { setAccount, getMyAccount, setSavingsAccount };
};
