import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { TSavings } from '@/types/Account';
import { TFeed } from '@/types/Feed';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

  const sendSaving = async (
    selectedSaving: TSavings,
    amount: number,
    message: string
  ): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        amount: amount,
        message: message,
        status: true,
      }),
    };

    const response = await fetchApi(
      `${baseUrl}/${selectedSaving.account_id}/transfer`,
      options
    );
    return response.code === 200;
  };

  return { getSavingDetails, sendSaving };
};
