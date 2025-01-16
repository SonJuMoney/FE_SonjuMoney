'use client';

import FamilyCardLarge from '@/components/atoms/Cards/FamilyCardLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import useSendAllowanceStore from '@/store/useSendAllowanceStore';
import { useRouter } from 'next/navigation';

type Family = {
  familyId: number;
  familyName: string;
  familyMember: string[];
};

const SelectFamily = () => {
  const { setSelectedFamily } = useSendAllowanceStore();
  const router = useRouter();

  const families = [
    {
      familyId: 1,
      familyName: '첫째네 가족',
      familyMember: ['준용1', '미진1', '형석1', '서현1'],
    },
    {
      familyId: 2,
      familyName: '둘째네 가족',
      familyMember: ['준용2', '미진2', '형석2', '서현2'],
    },
    {
      familyId: 3,
      familyName: '셋째네 가족',
      familyMember: ['준용3', '미진3', '형석3', '서현3'],
    },
    {
      familyId: 4,
      familyName: '넷째네 가족',
      familyMember: ['준용4', '미진4', '형석4', '서현4'],
    },
  ];

  const colors = ['bg-appColor', 'bg-secondary', 'bg-pink'];

  const handleSelectFamily = (family: Family) => {
    setSelectedFamily(family);
    router.push(`/allowance/send/member`);
  };
  return (
    <div>
      <Header title='용돈 보내기' />

      <div className='p-5'>
        <PageTitle title='가족을 선택해주세요' />

        <div className='mt-[34px] space-y-4'>
          {families.map((family, index) => (
            <div key={family.familyId}>
              <FamilyCardLarge
                familyName={family.familyName}
                familyMember={family.familyMember}
                color={`${colors[index % colors.length]}`}
                onClick={() => handleSelectFamily(family)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectFamily;
