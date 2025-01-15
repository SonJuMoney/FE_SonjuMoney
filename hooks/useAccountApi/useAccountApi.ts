import { useApi } from '@/hooks/useApi';
import { TSetAccountReq } from '@/types/Account';

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

  return { setAccount };
};
