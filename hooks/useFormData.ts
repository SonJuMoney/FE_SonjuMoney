import { useSession } from 'next-auth/react';

export const useFormData = () => {
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

    const finalOptions = {
      ...options,
      headers,
    };

    // body 처리
    if (options.body) {
      const formData = new FormData();
      Object.entries(options.body).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      });
      finalOptions.body = formData;
    }

    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
  };

  return { fetchApi };
};
