'use client';

import FamilyCardLarge from '@/components/atoms/Cards/FamilyCardLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import useSendAllowanceStore from '@/store/useSendAllowanceStore';
import { TFamily } from '@/types/Family';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SelectFamily = () => {
  const [families, setFamilies] = useState<TFamily[]>([]);
  const { setSelectedFamily } = useSendAllowanceStore();
  const router = useRouter();
  const { getFamilies } = useFamilyApi();

  const colors = ['bg-appColor', 'bg-secondary', 'bg-pink'];

  useEffect(() => {
    const fetchFamilies = async () => {
      const response = await getFamilies();
      setFamilies(response);
    };

    fetchFamilies();
  }, []);

  const handleSelectFamily = (family: TFamily) => {
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
            <div key={family.family_id}>
              <FamilyCardLarge
                familyName={family.family_name}
                familyMember={family.members}
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
