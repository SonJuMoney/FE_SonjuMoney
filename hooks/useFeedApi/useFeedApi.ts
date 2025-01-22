import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { TAddCommentReq, TCreateFeedReq, TFeed } from '@/types/Feed';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFeedApi = () => {
  const { fetchApi } = useApi();
  const queryClient = useQueryClient();

  const baseUrl = '/feeds';

  const createFormDataWithFile = (feedData: TCreateFeedReq): FormData => {
    const formData = new FormData();
    // 파일 추가
    formData.append('file', feedData.file);
    formData.append(
      'data',
      new Blob([JSON.stringify(feedData.data)], {
        type: 'application/json',
      })
    );
    return formData;
  };

  // 피드 생성
  const createFeedMutation = useMutation({
    mutationFn: async (feedData: TCreateFeedReq) => {
      const formData = createFormDataWithFile(feedData);
      const options: RequestInit = {
        method: 'POST',
        body: formData,
      };
      const response = await fetchApi(`${baseUrl}`, options, undefined, true);
      return response?.code === 200;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });

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

  const addCommentMutation = useMutation({
    mutationFn: ({ feed_id, message }: TAddCommentReq) =>
      fetchApi(`${baseUrl}/${feed_id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ message }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (comment_id: number) =>
      fetchApi(`${baseUrl}/comments/${comment_id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
    },
  });

  return {
    createFeed: createFeedMutation.mutate,
    getFeedList,
    likeFeed: likeFeedMutation.mutate,
    deleteFeed: deleteFeedMutation.mutate,
    addComment: addCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
  };
};
