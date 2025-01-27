import { TransactionList } from '@/types/Account';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { GetPaginationResult } from '../useApi';
import { useAccountApi } from './useAccountApi';

const useAccountQuery = () => {
  const { getTransactions } = useAccountApi();

  const GetTransactions = (
    accountId: number
  ): UseInfiniteQueryResult<
    InfiniteData<GetPaginationResult<TransactionList>>
  > => {
    return useInfiniteQuery({
      queryKey: ['transactions', accountId],
      queryFn: ({ pageParam }) => getTransactions(accountId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.hasNext) return undefined;
        return lastPage.page + 1;
      },
    });
  };
  return { GetTransactions };
};

export default useAccountQuery;
