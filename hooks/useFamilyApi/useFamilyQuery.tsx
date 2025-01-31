import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { queryKeys } from '@/lib/queryKeys';
import { useFamilyApi } from './useFamilyApi';

const useFamilyQuery = () => {
  const { getFamilies, acceptInvite } = useFamilyApi();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const GetFamilyList = () => {
    return useQuery({
      queryKey: [queryKeys.familyList, session?.user?.accessToken],
      queryFn: () => getFamilies(),
      staleTime: 0,
    });
  };

  const AcceptInvite = useMutation({
    mutationFn: (familyId: number) => acceptInvite(familyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.familyList });
      queryClient.refetchQueries({ queryKey: queryKeys.familyList });
    },
  });

  return { GetFamilyList, acceptInvitation: AcceptInvite.mutate };
};

export default useFamilyQuery;
