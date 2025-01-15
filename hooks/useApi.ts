import { auth } from '@/lib/auth';

export const useApi = async () => {
  const session = await auth();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchApi = async (
    apiRoute: string,
    options: RequestInit = {},
    token: boolean = true
  ) => {
    if (!session?.user?.jwt) {
      throw new Error('No JWT token found');
    }

    const url = `${baseUrl}/api/${apiRoute}`;

    // 헤더 설정
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${session.user.accessToken}`);

    if (token) {
      if (!session?.user?.jwt) {
        throw new Error('No JWT token found');
      }
      headers.set('Authorization', `Bearer ${session.user.accessToken}`);
    }

    // 요청 실행
    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 응답 체크
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return response.json();
  };

  return { fetchApi };
};
