import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { TFeed } from '@/types/Feed';

export const useFeedApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/feeds';

  const getFeedList = async (familyId: number, pageParam: number) => {
    const data: ResponseType<GetPaginationResult<TFeed>> = await fetchApi(
      `${baseUrl}`,
      { method: 'GET' },
      { family_id: familyId, page: pageParam }
    );

    return data.result;
  };

  const deleteFeed = async (feed_id: number) => {
    const data = await fetchApi(`${baseUrl}/${feed_id}`, { method: 'DELETE' });
    console.log(data);
    return data;
  };

  return { getFeedList, deleteFeed };
};
