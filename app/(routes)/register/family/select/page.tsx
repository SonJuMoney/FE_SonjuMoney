'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import RoleList from '@/components/molecules/Lists/RoleList';
import { useUserApi } from '@/hooks/useUserApi/useUserApi';
import useRegisterFamilyStore from '@/store/useRegisterFamilyStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SelectFamily = () => {
  const [roles, setRoles] = useState<string[]>([]);
  const [subTitle, setSubTitle] = useState('');
  const { selectedRole, setSelectedRole } = useRegisterFamilyStore();
  const router = useRouter();
  const { getUser } = useUserApi();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();

      if (response.gender === 'MALE') {
        setRoles(['할아버지', '아빠', '아들']);
        setSubTitle('할아버지, 아빠, 아들 중에 선택해주세요');
      } else if (response.gender === 'FEMALE') {
        setRoles(['할머니', '엄마', '딸']);
        setSubTitle('할머니, 엄마, 딸 중에 선택해주세요');
      }
    };

    fetchUser();
  }, []);

  const handleNextStep = () => {
    router.push('/register/family/invite');
  };

  return (
    <div>
      <Header title='가족 등록하기' />
      <div className='p-5 space-y-[35px]'>
        <PageTitle
          title={`가족 내에서 본인의
역할을 선택해주세요`}
          subTitle={subTitle}
        />
        <RoleList
          roles={roles}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='다음'
          disabled={!selectedRole}
          onClick={handleNextStep}
        />
      </div>
    </div>
  );
};

export default SelectFamily;
