import { TFeed } from '@/types/Feed';
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { GetPaginationResult } from '../useApi';
import { useFeedApi } from './useFeedApi';

const useFeedQuery = () => {
  const { getFeedList } = useFeedApi();

  const GetFeed = (
    familyId: number
  ): UseInfiniteQueryResult<InfiniteData<GetPaginationResult<TFeed>>> => {
    return useInfiniteQuery({
      queryKey: ['feeds', familyId],
      queryFn: ({ pageParam }) => getFeedList(familyId, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (!lastPage?.hasNext) return undefined;
        return lastPage.page + 1;
      },
    });
  };
  return { GetFeed };
};

export default useFeedQuery;
