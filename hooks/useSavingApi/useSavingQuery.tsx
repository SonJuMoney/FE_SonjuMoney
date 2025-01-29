import { TSavingList } from '@/types/Saving';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { GetPaginationResult } from '../useApi';
import { useSavingApi } from './useSavingApi';

const useSavingQuery = () => {
  const { getSavingDetails } = useSavingApi();

  const GetSavings = (
    savingId: number
  ): UseInfiniteQueryResult<InfiniteData<GetPaginationResult<TSavingList>>> => {
    return useInfiniteQuery({
      queryKey: ['savings', savingId],
      queryFn: ({ pageParam }) => getSavingDetails(savingId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.hasNext) return undefined;
        return lastPage.page + 1;
      },
    });
  };
  return { GetSavings };
};

export default useSavingQuery;
