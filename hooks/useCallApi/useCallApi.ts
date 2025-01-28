import { Recommendation } from '@/types/Calls';
import { useApi } from '../useApi';

export const useCallApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/calls';

  const getRecommendations = async (
    target_id: number
  ): Promise<Recommendation[]> => {
    const response = await fetchApi(
      `${baseUrl}/recommendations?target_id=${target_id}`
    );

    return response;
  };

  return { getRecommendations };
};
