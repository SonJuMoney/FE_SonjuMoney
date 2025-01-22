'use server';

import { auth } from '@/lib/auth';

export async function fetchData(
  apiRoute: string,
  method: string = 'GET',
  options: RequestInit = {},
  body?: Record<string, unknown>,
  isMultiPart?: boolean
) {
  // 서버 세션 가져오기
  const session = await auth();

  // 인증 체크
  if (!session?.user?.accessToken) {
    throw new Error('Not authenticated');
  }

  // API 기본 URL 설정
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${baseUrl}${apiRoute}`;

  // 요청 헤더 설정
  const headers: HeadersInit = {
    Authorization: `Bearer ${session.user.accessToken}`,
  };
  if (!isMultiPart) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // 요청 옵션 설정

  // API 호출
  // const response = await fetch(url, options);
  // console.log(response);
  // 응답 체크
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}
