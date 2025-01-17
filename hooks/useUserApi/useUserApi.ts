import { useApi } from '@/hooks/useApi';
import { TProfile } from '@/types/user';

export const useUserApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/users';

  // 유저 정보 조회
  const getUser = async (): Promise<TProfile> => {
    const response = await fetchApi(baseUrl);

    return response;
  };

  return { getUser };
};
