'use client';

import FamilyCardLarge from '@/components/atoms/Cards/FamilyCardLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import { useFamilyApi } from '@/hooks/useFamilyApi/useFamilyApi';
import useSavingsAccountStore from '@/store/useSavingsAccountStore';
import { TFamily } from '@/types/Family';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const FamilySelect = () => {
  const [families, setFamilies] = useState<TFamily[]>([]);
  const { setSelectedFamily } = useSavingsAccountStore();
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

  const onClick = (family: TFamily) => {
    setSelectedFamily(family);
    router.push(`/savings/member`);
  };
  return (
    <div className='pageLayout'>
      <Header title='적금 들어주기' />

      <div className='defaultLayout'>
        <PageTitle title='가족을 선택해주세요' />

        <div className='mt-[34px] space-y-4'>
          {families.map((family, index) => (
            <div key={family.family_id}>
              <FamilyCardLarge
                familyName={family.family_name}
                familyMember={family.members}
                color={`${colors[index % colors.length]}`}
                onClick={() => onClick(family)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilySelect;
