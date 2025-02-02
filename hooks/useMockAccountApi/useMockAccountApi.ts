import { useApi } from '@/hooks/useApi';
import { TAccount, TPswdReq } from '@/types/Account';

export const useMockAccountApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/mock/accounts';

  // Mock 계좌 조회
  const getMockAccounts = async (userId?: number): Promise<TAccount[]> => {
    const url = userId ? `${baseUrl}?user_id=${userId}` : baseUrl;
    const response = await fetchApi(url);

    return response;
  };

  // Mock 계좌 비밀번호 확인
  const checkPswd = async (paswdData: TPswdReq): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(paswdData),
    };
    const response = await fetchApi(`${baseUrl}/pin`, options);

    return response.code === 200;
  };

  return { getMockAccounts, checkPswd };
};
