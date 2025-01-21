import { useApi } from '@/hooks/useApi';
import { Child, TProfile } from '@/types/user';

export const useUserApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/users';

  // 유저 정보 조회
  const getUser = async (): Promise<TProfile> => {
    const response = await fetchApi(baseUrl);

    return response;
  };

  // 내 아이 조회
  const getChildren = async (): Promise<Child[]> => {
    const response = await fetchApi(`${baseUrl}/children`);

    return response;
  };

  return { getUser, getChildren };
};
