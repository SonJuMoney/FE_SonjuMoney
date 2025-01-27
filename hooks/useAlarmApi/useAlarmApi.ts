import { ResponseType, GetPaginationResult, useApi } from '@/hooks/useApi';
import { TAlarm, TAlarmStatusResponse } from '@/types/Alarm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export const useAlarmApi = () => {
  const { fetchApi } = useApi();
  const queryClient = useQueryClient();

  const baseUrl = '/alarms';

  const getAlarmStatus = async (): Promise<TAlarmStatusResponse> => {
    const response = await fetchApi(`${baseUrl}/status/RECEIVED`);

    return response;
  };

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
      queryClient.invalidateQueries({ queryKey: queryKeys.alarms });
      queryClient.invalidateQueries({ queryKey: queryKeys.alarmStatus });
    },
  });

  return {
    getAlarmList,
    readAlarm: readAlarmMutation.mutate,
    getAlarmStatus,
  };
};
