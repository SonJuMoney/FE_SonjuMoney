import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { queryKeys } from '@/lib/queryKeys';
import { useFamilyApi } from './useFamilyApi';

const useFamilyQuery = () => {
  const { getFamilies } = useFamilyApi();
  const { data: session } = useSession();

  const GetFamilyList = () => {
    return useQuery({
      queryKey: [queryKeys.familyList, session?.user?.accessToken],
      queryFn: () => getFamilies(),
      staleTime: 0,
    });
  };

  return { GetFamilyList };
};

export default useFamilyQuery;
