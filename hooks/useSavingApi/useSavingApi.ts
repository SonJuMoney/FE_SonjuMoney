import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
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

  return { getSavingDetails };
};
