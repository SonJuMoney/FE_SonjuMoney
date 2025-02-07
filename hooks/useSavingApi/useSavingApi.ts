import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { SavingsResponse, TSavings } from '@/types/Account';
import { TFeed } from '@/types/Feed';
import { TSavingLimit } from '@/types/Saving';

export const useSavingApi = () => {
  const { fetchApi } = useApi();

  const baseUrl = '/accounts/savings';

  const getSavingDetails = async (savingId: number, pageParam: number) => {
    const data: ResponseType<GetPaginationResult<TFeed>> = await fetchApi(
      `${baseUrl}/${savingId}`,
      { method: 'GET' },
      { page: pageParam }
    );

    return data.result;
  };

  const getSavingLimit = async (savingId: number): Promise<TSavingLimit> => {
    const response = await fetchApi(`${baseUrl}/${savingId}/limit`);
    return response;
  };

  const sendSaving = async (
    selectedSaving: TSavings,
    amount: number,
    message: string,
    password: string
  ): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        amount: amount,
        message: message,
        pin: password,
      }),
    };

    const response = await fetchApi(
      `${baseUrl}/${selectedSaving.account_id}/transfer`,
      options
    );
    return response.code === 201;
  };

  // 적금 계좌 목록 조회
  const getSavingsAccounts = async (): Promise<SavingsResponse> => {
    const response = await fetchApi(baseUrl);
    return response;
  };

  return { getSavingDetails, sendSaving, getSavingsAccounts, getSavingLimit };
};
