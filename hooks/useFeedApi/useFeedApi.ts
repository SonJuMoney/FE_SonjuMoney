import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { TFeed } from '@/types/Feed';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFeedApi = () => {
  const { fetchApi } = useApi();
  const queryClient = useQueryClient();

  const baseUrl = '/feeds';

  const getFeedList = async (familyId: number, pageParam: number) => {
    const data: ResponseType<GetPaginationResult<TFeed>> = await fetchApi(
      `${baseUrl}`,
      { method: 'GET' },
      { family_id: familyId, page: pageParam }
    );

    return data.result;
  };

  const likeFeedMutation = useMutation({
    mutationFn: (feed_id: number) =>
      fetchApi(`${baseUrl}/${feed_id}/likes`, { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });

  const deleteFeedMutation = useMutation({
    mutationFn: (feed_id: number) =>
      fetchApi(`${baseUrl}/${feed_id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });

  return {
    getFeedList,
    likeFeed: likeFeedMutation.mutate,
    deleteFeed: deleteFeedMutation.mutate,
  };
};
