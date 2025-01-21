import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { TFeed } from '@/types/Feed';

export const useFeedApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/feeds';

  const getFeedList = async (
    familyId: number,
    pageParam: number
  ): Promise<ResponseType<GetPaginationResult<TFeed>>> => {
    const response = await fetchApi(
      `${baseUrl}`,
      { method: 'GET' },
      {
        page: pageParam,
        family_id: familyId,
      },
      true
    );

    return response.data;
  };

  return { getFeedList };
};
