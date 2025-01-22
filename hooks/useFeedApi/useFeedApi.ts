import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { TAddCommentReq, TFeed } from '@/types/Feed';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFeedApi = () => {
  const { fetchApi } = useApi();
  const queryClient = useQueryClient();

  const baseUrl = '/feeds';

  // const createFormDataWithFile = (
  //   allowanceData: TSendAllowanceReq
  // ): FormData => {
  //   const formData = new FormData();

  //   // 파일 추가
  //   formData.append('file', allowanceData.file);

  //   formData.append(
  //     'data',
  //     new Blob([JSON.stringify(allowanceData.data)], {
  //       type: 'application/json',
  //     })
  //   );

  //   // FormData 내용 로깅
  //   console.log('FormData entries:', Object.fromEntries(formData.entries()));

  //   return formData;
  // };

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
    getFeedList,
    likeFeed: likeFeedMutation.mutate,
    deleteFeed: deleteFeedMutation.mutate,
    addComment: addCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
  };
};
