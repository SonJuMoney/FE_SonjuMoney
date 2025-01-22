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

    return !!response;
  };

  const deleteEvent = async (eventId: string): Promise<boolean> => {
    const response = await fetchApi(`${baseUrl}/${eventId}`, {
      method: 'DELETE',
    });

    return response.code === 200;
  };

  const updateEvent = async (
    eventId: string,
    eventData: string
  ): Promise<boolean> => {
    const options: RequestInit = {
      method: 'PATCH',
      body: eventData,
    };

    const response = await fetchApi(`${baseUrl}/${eventId}`, options);

    return !!response;
  };

  return { getEvents, getEventDetail, setEvent, deleteEvent, updateEvent };
};
