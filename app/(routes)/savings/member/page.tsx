'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import RoleList from '@/components/molecules/Lists/RoleList';
import useSavingsAccountStore from '@/store/useSavingsAccountStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SelectChild = () => {
  const { selectedFamily, setSelectedChild } = useSavingsAccountStore();
  const router = useRouter();
  const [child, setChild] = useState<string>('');

  if (!selectedFamily) return null;
  const { members } = selectedFamily;

  const handleSelect = () => {
    const selectedMember = members.find(
      (member) => member.member_name === child
    );
    if (selectedMember) {
      setSelectedChild(selectedMember);
      router.push('/savings/agreement');
    } else {
      alert('선택된 멤버를 찾을 수 없습니다.');
    }
  };

  return (
    <div className='pageLayout'>
      <Header title='적금 들어주기' />
      <div className='defaultLayout gap-[30px]'>
        <PageTitle
          title={`어떤 손주의 적금을
가입할까요?`}
        />

        <RoleList
          roles={members.map((member) => member.member_name)}
          selectedRole={child}
          setSelectedRole={setChild}
        />
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge text='선택완료' disabled={!child} onClick={handleSelect} />
      </div>
    </div>
  );
};

export default SelectChild;
