import { ChildData } from '@/components/atoms/Inputs/SignupIput';
import { useApi } from '@/hooks/useApi';
import { TPswdReq } from '@/types/Account';
import { TAuth, TSession } from '@/types/user';

export const useAuthApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/auth';

  //아이 회원가입
  const signupChild = async (childData: ChildData): Promise<number> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        auth_id: childData.id,
        name: childData.name,
        resident_num: childData.residentNum,
      }),
    };

    const response = await fetchApi(`${baseUrl}/sign-up-child`, options);

    return response.id;
  };

  // 간편 비밀번호 확인
  const checkPassCode = async (paswdData: TPswdReq): Promise<boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(paswdData),
    };
    const response = await fetchApi(`${baseUrl}/pin`, options);

    return response.code === 200;
  };

  const getAuthList = async (): Promise<TAuth[]> => {
    const response = await fetchApi(`${baseUrl}/list`);

    return response;
  };

  const switchAccount = async (userId: string): Promise<TSession> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        target_id: userId,
      }),
    };

    const response = await fetchApi(
      `${baseUrl}/switch-account`,
      options,
      undefined,
      true
    );

    return response;
  };

  return { signupChild, checkPassCode, getAuthList, switchAccount };
};
