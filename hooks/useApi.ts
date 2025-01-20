import { useSession } from 'next-auth/react';

export const useApi = () => {
  const { data: session } = useSession();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchApi = async (
    apiRoute: string,
    options: RequestInit = {},
    queryParams?: Record<string, unknown>
  ) => {
    if (!session?.user?.accessToken) {
      throw new Error('No JWT token found');
    }

    // 쿼리 파라미터 처리
    const searchParams = new URLSearchParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }

    // URL 생성
    const url = `${baseUrl}${apiRoute}${
      searchParams.toString() ? `?${searchParams.toString()}` : ''
    }`;

    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${session.user?.accessToken}`);
    headers.set('Content-Type', 'application/json');

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
  };

  return { fetchApi };
};

export interface ResponseType<T = unknown> {
  isSuccess: boolean;
  code: number;
  message: string;
  result?: T;
}

export interface GetPaginationResult<T> {
  hasNext: boolean;
  page: number;
  contents: Array<T>;
}
