import { useApi } from '@/hooks/useApi';
import { TEvent } from '@/types/Events';

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

  const getEventDetail = async (eventId: string): Promise<TEvent> => {
    const response = await fetchApi(`${baseUrl}/${eventId}`);

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

  const deleteEvent = async (eventId: string): Promise<boolean> => {
    const response = await fetchApi(`${baseUrl}/${eventId}`, {
      method: 'DELETE',
    });

    console.log(response);
    console.log(response.code);

    return response === null || response.code === 200;
  };

  return { getEvents, getEventDetail, setEvent, deleteEvent };
};
