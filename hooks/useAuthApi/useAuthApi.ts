import { useApi } from '@/hooks/useApi';
import { TPswdReq } from '@/types/Account';

export const useAuthApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/auth';

  // 간편 비밀번호 확인
  const checkPassCode = async (paswdData: TPswdReq): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(paswdData),
    };
    const response = await fetchApi(`${baseUrl}/pin`, options);

    return response.code === 200;
  };

  return { checkPassCode };
};
