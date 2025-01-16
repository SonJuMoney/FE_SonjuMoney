'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import RoleList from '@/components/molecules/Lists/RoleList';
import useSendAllowanceStore from '@/store/useSendAllowanceStore';
import { useRouter } from 'next/navigation';

const SelectRecipient = () => {
  const { selectedFamily, selectedMember, setSelectedMember } =
    useSendAllowanceStore();
  const router = useRouter();

  if (!selectedFamily) return null;
  const { familyMember } = selectedFamily;

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

        <RoleList
          roles={familyMember}
          selectedRole={selectedMember}
          setSelectedRole={setSelectedMember}
        />
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
