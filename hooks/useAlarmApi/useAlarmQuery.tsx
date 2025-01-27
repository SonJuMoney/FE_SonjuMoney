import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { useAlarmApi } from './useAlarmApi';

const useAlarmQuery = () => {
  const { getAlarmStatus, getAlarmList } = useAlarmApi();

  const GetAlarmStatus = () => {
    return useQuery({
      queryKey: queryKeys.alarmStatus,
      queryFn: () => getAlarmStatus(),
      gcTime: 15000,
      refetchInterval: 15000,
    });
  };

  const GetAlarmList = (options?: { enabled?: boolean }) => {
    return useInfiniteQuery({
      queryKey: queryKeys.alarms,
      queryFn: ({ pageParam }) => getAlarmList(pageParam),
      initialPageParam: 0,
      enabled: options?.enabled,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.hasNext) return undefined;
        return lastPage.page + 1;
      },
    });
  };
  return { GetAlarmList, GetAlarmStatus };
};

export default useAlarmQuery;
