import { useApi } from '../useApi';

export const useCallApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/videocalls';

  // const sendAllowance = async (
  //   allowanceData: TSendAllowanceReq
  // ): Promise<boolean> => {
  //   const options: RequestInit = {
  //     method: 'POST',
  //     body: JSON.stringify(allowanceData),
  //   };
  //   const response = await fetchApi(`${baseUrl}`, options);

  //   return response.code === 200;
  // };

  // return { getUser, getChildren };
};
