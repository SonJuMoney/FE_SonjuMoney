import { useApi } from '@/hooks/useApi';
import { TFamily, TSetFamilyReq } from '@/types/Family';

export const useFamilyApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/families';

  // 가족 목록 조회
  const getFamilies = async (): Promise<TFamily[]> => {
    const response = await fetchApi(baseUrl);

    return response;
  };

  // 가족 멤버 목록 조회
  const getFamilyMembers = async (family_id: number): Promise<TFamily[]> => {
    const response = await fetchApi(`${baseUrl}/${family_id}/members`);

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

  return { getFamilies, setFamily };
};
