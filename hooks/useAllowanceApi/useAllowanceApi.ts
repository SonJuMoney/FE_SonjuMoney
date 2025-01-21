import { useApi } from '@/hooks/useApi';
import { TSendAllowanceReq } from '@/types/Allowance';

export const useAllowanceApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/allowances';

  // 용돈 보내기
  const sendAllowance = async (
    allowanceData: TSendAllowanceReq
  ): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(allowanceData),
    };
    const response = await fetchApi(`${baseUrl}`, options, undefined, true);

    return response.code === 200;
  };

  return { sendAllowance };
};
