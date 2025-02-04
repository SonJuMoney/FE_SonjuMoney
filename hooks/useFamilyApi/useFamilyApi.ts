import { useApi } from '@/hooks/useApi';
import { TFamily, TSetFamilyReq } from '@/types/Family';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { queryKeys } from '@/lib/queryKeys';
import { useToast } from '../use-toast';

export const useFamilyApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/families';
  const invitationUrl = '/invitation';
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { toast } = useToast();

  // 가족 목록 조회
  const getFamilies = async (): Promise<TFamily[]> => {
    const response = await fetchApi(baseUrl);

    return response;
  };

  // 가족 멤버 목록 조회
  const getFamilyMembers = async (
    family_id: number,
    range: 'ALL' | 'EXCEPTME' | 'CHILDREN'
  ): Promise<TFamily> => {
    const response = await fetchApi(
      `${baseUrl}/${family_id}/members?range=${range}`
    );

    return response;
  };

  // 가족 생성
  const setFamily = async (familyData: TSetFamilyReq): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(familyData),
    };
    const response = await fetchApi(`${baseUrl}`, options);

    return response.code === 200;
  };

  const acceptInvite = useMutation({
    mutationFn: (familyId: number) =>
      fetchApi(`${invitationUrl}/${familyId}`, {
        method: 'POST',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.familyList, session?.user?.accessToken],
      });
    },
    onError: () => {
      toast({ title: '초대 받기에 실패했어요' });
    },
  });

  return {
    getFamilies,
    getFamilyMembers,
    setFamily,
    acceptInvitation: acceptInvite.mutate,
  };
};
