'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import RoleCard from '@/components/atoms/Cards/RoleCard';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import useSavingsAccountStore from '@/store/useSavingsAccountStore';
import { TFamily } from '@/types/Family';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SelectChild = () => {
  const { selectedFamily, selectedChild, setSelectedChild } =
    useSavingsAccountStore();
  const router = useRouter();
  const { getFamilyMembers } = useFamilyApi();

  const [family, setFamily] = useState<TFamily | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedFamily) return null;

      try {
        const response = await getFamilyMembers(
          selectedFamily.family_id,
          'CHILDREN'
        );
        console.log(response);
        setFamily(response);
      } catch (error) {
        console.error('Failed to fetch only children:', error);
      }
    };

    fetchMembers();
  }, []);
  const handleSelect = () => {
    router.push('/savings/agreement');
  };

  return (
    <div className='pageLayout'>
      <Header title='적금 들어주기' />
      <div className='defaultLayout gap-[30px]'>
        <PageTitle
          title={`어떤 손주의 적금을
가입할까요?`}
        />

        <div className='grid grid-cols-2 gap-5'>
          {family?.members.map((member, index) => (
            <RoleCard
              key={index}
              image='/Role1.png' // 이미지 바꾸기
              // image={member.profile_link}
              name={member.member_name}
              selected={selectedChild?.member_id === member.member_id}
              onClick={() =>
                setSelectedChild(
                  selectedChild?.member_id === member.member_id ? null : member
                )
              }
            />
          ))}
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='선택완료'
          disabled={!selectedChild}
          onClick={handleSelect}
        />
      </div>
    </div>
  );
};

export default SelectChild;
