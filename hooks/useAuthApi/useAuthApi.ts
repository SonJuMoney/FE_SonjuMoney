import { ChildData } from '@/components/atoms/Inputs/SignupIput';
import { useApi } from '@/hooks/useApi';
import { TPswdReq } from '@/types/Account';

export const useAuthApi = () => {
  const { fetchApi } = useApi();
  const baseUrl = '/auth';

  //아이 회원가입
  const signupChild = async (
    childData: ChildData
  ): Promise<number | boolean> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        auth_id: childData.id,
        name: childData.name,
        resident_num: childData.residentNum,
      }),
    };

    const response = await fetchApi(`${baseUrl}/sign-up-child`, options);

    return response.code === 201 ? response.id : false;
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

  return { signupChild, checkPassCode };
};
