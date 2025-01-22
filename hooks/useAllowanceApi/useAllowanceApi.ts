import { useApi } from '@/hooks/useApi';
import { TSendAllowanceReq } from '@/types/Allowance';

export const useAllowanceApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/allowances';

  const createFormDataWithFile = (
    allowanceData: TSendAllowanceReq
  ): FormData => {
    const formData = new FormData();
    // 파일 추가
    formData.append('file', allowanceData.file);
    formData.append(
      'data',
      new Blob([JSON.stringify(allowanceData.data)], {
        type: 'application/json',
      })
    );
    return formData;
  };

  // 용돈 보내기
  const sendAllowance = async (
    allowanceData: TSendAllowanceReq
  ): Promise<boolean> => {
    const formData = createFormDataWithFile(allowanceData);

    const options: RequestInit = {
      method: 'POST',
      body: formData,
    };

    const response = await fetchApi(`${baseUrl}`, options, undefined, true);
    return response?.code === 200;
  };

  return { sendAllowance };
};
