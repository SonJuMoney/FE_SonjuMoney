import { useApi } from '@/hooks/useApi';
import { TEvent, TEventReq } from '@/types/Events';

export const useEventApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/events';

  const getEvents = async (
    familyId: number,
    year: number,
    month: number
  ): Promise<TEvent[]> => {
    const response = await fetchApi(
      `${baseUrl}?family_id=${familyId}&year=${year}&month=${month}`
    );

    return response;
  };

  const setEvent = async (
    familyId: number,
    eventData: string
  ): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: eventData,
    };

    const response = await fetchApi(
      `${baseUrl}?family_id=${familyId}`,
      options
    );

    console.log(response);

    return false;
  };

  return { getEvents, setEvent };
};
