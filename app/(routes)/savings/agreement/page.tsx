'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import Agreement from '@/components/molecules/Agreement';
import { useUserApi } from '@/hooks/useUserApi/useUserApi';
import useSavingsAccountStore from '@/store/useSavingsAccountStore';
import { TProfile } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TermsAgreement = () => {
  const { selectedChild } = useSavingsAccountStore();
  const { getUser } = useUserApi();
  const [user, setUser] = useState<TProfile | null>(null);
  const router = useRouter();

  const termsCount = 5;
  const [terms, setTerms] = useState(Array(termsCount).fill(false));

  const allChecked = terms.every((term) => term);

  const handleAllChecked = (checked: boolean) => {
    setTerms(terms.map(() => checked));
  };

  const handleTermChange = (index: number, checked: boolean) => {
    const updatedTerms = [...terms];
    updatedTerms[index] = checked;
    setTerms(updatedTerms);
  };

  const agreements = [
    '법정 대리인 인증 자동화 서비스 이용 동의',
    '고유식별정보 수집이용 동의 (법정대리인)',
    '개인(신용)정보 제3자 제공 동의 (법정대리인)',
    '개인(신용)정보 수집이용 동의 (법정대리인)',
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser();
      setUser(response);
    };

    fetchUser();
  }, []);

  return (
    <div className='pageLayout'>
      <Header title='적금 들어주기' />
      <div className='defaultLayout justify-between'>
        <PageTitle
          title={`${user?.username}님이 ${selectedChild?.member_name}님의
법정 대리인인지 확인할게요`}
          subTitle={`손주머니가 대신, 법원 가족관계 증명서류를
안전하게 확인해요`}
        />
        <div>
          <Agreement
            text='전체 동의'
            checked={allChecked}
            onChange={handleAllChecked}
          />

          {agreements.map((text, index) => (
            <Agreement
              key={index}
              text={text}
              required
              checked={terms[index]}
              onChange={(checked) => handleTermChange(index, checked)}
            />
          ))}

          <div className='w-full mt-8'>
            <ButtonLarge
              text='동의하고 다음'
              disabled={!allChecked}
              onClick={() => router.push(`/savings/payment`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAgreement;
