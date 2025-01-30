import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { queryKeys } from '@/lib/queryKeys';
import { useAlarmApi } from './useAlarmApi';

const useAlarmQuery = () => {
  const { getAlarmStatus, getAlarmList } = useAlarmApi();
  const { data: session } = useSession();

  const GetAlarmStatus = () => {
    return useQuery({
      queryKey: [queryKeys.alarmStatus, session?.user?.userId],
      queryFn: () => getAlarmStatus(),
      refetchInterval: 15000,
      staleTime: 0,
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
