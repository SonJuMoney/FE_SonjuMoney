'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import RoleCard from '@/components/atoms/Cards/RoleCard';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import useSendAllowanceStore from '@/store/useSendAllowanceStore';
import { TFamily } from '@/types/Family';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProfileImage } from '@/lib/utils';

const SelectRecipient = () => {
  const { selectedFamily, selectedMember, setSelectedMember } =
    useSendAllowanceStore();
  const router = useRouter();
  const { getFamilyMembers } = useFamilyApi();
  const [family, setFamily] = useState<TFamily | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedFamily) return null;

      try {
        const response = await getFamilyMembers(
          selectedFamily.family_id,
          'EXCEPTME'
        );
        setFamily(response);
      } catch (error) {
        console.error('Failed to fetch family members except me:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleNextStep = () => {
    router.push(`/allowance/send/amount`);
  };

  return (
    <div>
      <Header title='용돈 보내기' />
      <div className='p-5 space-y-[30px]'>
        <PageTitle
          title={`누구에게 용돈을
보낼까요?`}
        />

        <div className='grid grid-cols-2 gap-5'>
          {family?.members.map((member, index) => (
            <RoleCard
              key={index}
              image={
                member.profile_link
                  ? member.profile_link
                  : getProfileImage(member.member_role) || ''
              }
              name={member.member_name}
              selected={selectedMember?.member_id === member.member_id}
              onClick={() =>
                setSelectedMember(
                  selectedMember?.member_id === member.member_id ? null : member
                )
              }
            />
          ))}
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='선택완료'
          disabled={!selectedMember}
          onClick={handleNextStep}
        />
      </div>
    </div>
  );
};

export default SelectRecipient;
