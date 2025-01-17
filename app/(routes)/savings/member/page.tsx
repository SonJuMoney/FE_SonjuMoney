'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import RoleList from '@/components/molecules/Lists/RoleList';
import useSavingsAccountStore from '@/store/useSavingsStore';
import { useRouter } from 'next/navigation';

const SelectChild = () => {
  const { selectedFamily, selectedChild, setSelectedChild } =
    useSavingsAccountStore();
  const router = useRouter();

  if (!selectedFamily) return null;
  const { members } = selectedFamily;

  return (
    <div>
      <Header title='적금 들어주기' />
      <div className='p-5 space-y-[30px]'>
        <PageTitle
          title={`어떤 손주의 적금을
가입할까요?`}
        />

        <RoleList
          roles={members.map((member) => member.member_name)}
          selectedRole={selectedChild}
          setSelectedRole={setSelectedChild}
        />
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='선택완료'
          disabled={!selectedChild}
          onClick={() => router.push(`/savings/agreement`)}
        />
      </div>
    </div>
  );
};

export default SelectChild;
