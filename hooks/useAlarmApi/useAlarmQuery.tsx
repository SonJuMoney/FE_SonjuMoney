import { useInfiniteQuery } from '@tanstack/react-query';
import { useAlarmApi } from './useAlarmApi';

const useAlarmQuery = () => {
  const { getAlarmList } = useAlarmApi();

  const GetAlarmList = (options?: { enabled?: boolean }) => {
    return useInfiniteQuery({
      queryKey: ['alarms'],
      queryFn: ({ pageParam }) => getAlarmList(pageParam),
      initialPageParam: 0,
      enabled: options?.enabled,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.hasNext) return undefined;
        return lastPage.page + 1;
      },
    });
  };
  return { GetAlarmList };
};

export default useAlarmQuery;
