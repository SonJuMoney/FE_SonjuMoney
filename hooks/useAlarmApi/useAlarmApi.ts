import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { TAlarm } from '@/types/Alarm';
import { TAddCommentReq, TCreateFeedReq, TFeed } from '@/types/Feed';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAlarmApi = () => {
  const { fetchApi } = useApi();
  const queryClient = useQueryClient();

  const baseUrl = '/alarms';

  const getAlarmList = async (pageParam: number) => {
    const data: ResponseType<GetPaginationResult<TAlarm>> = await fetchApi(
      `${baseUrl}`,
      { method: 'GET' },
      { page: pageParam }
    );

    return data.result;
  };

  const readAlarmMutation = useMutation({
    mutationFn: (alarm_id: number) =>
      fetchApi(`${baseUrl}/${alarm_id}`, { method: 'PATCH' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alarms'] });
    },
  });

  return {
    getAlarmList,
    readAlarm: readAlarmMutation.mutate,
  };
};
