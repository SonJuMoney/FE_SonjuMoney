import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { TFeed } from '@/types/Feed';

export const useAllowanceApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/feeds';

  const getFeedList = async (): Promise<
    ResponseType<GetPaginationResult<TFeed[]>>
  > => {
    const response = await fetchApi(
      `${baseUrl}`,
      { method: 'GET' },
      {
        page: 1,
        size: 20,
      }
    );

    return response.data;
  };

  return { getFeedList };
};
