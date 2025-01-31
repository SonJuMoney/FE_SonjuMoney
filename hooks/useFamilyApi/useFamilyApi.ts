import { useApi } from '@/hooks/useApi';
import { TFamily, TInvitationResponse, TSetFamilyReq } from '@/types/Family';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';

export const useFamilyApi = () => {
  const { fetchApi } = useApi();
  const queryclient = useQueryClient();
  const baseUrl = '/families';
  const invitationUrl = '/invitation';

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

  const acceptInvite = async (
    familyId: number
  ): Promise<TInvitationResponse> => {
    const options: RequestInit = {
      method: 'POST',
    };
    const response = await fetchApi(`${invitationUrl}/${familyId}`, options);
    queryclient.refetchQueries({ queryKey: queryKeys.familyList });
    return response;
  };

  return { getFamilies, getFamilyMembers, setFamily, acceptInvite };
};
