'use client';

import { ButtonLarge } from '@/components/atoms/Buttons/ButtonLarge';
import Header from '@/components/atoms/Headers/Header';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';
import useRegisterFamilyStore from '@/store/useRegisterFamilyStore';
import { useRouter } from 'next/navigation';

const RegisterFamily = () => {
  const { familyName, setFamilyName } = useRegisterFamilyStore();

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 20자 이내로 제한
    if (value.length <= 20) {
      setFamilyName(value);
    }
  };

  const handleNextClick = () => {
    router.push('/register/family/select');
  };

  return (
    <div>
      <Header title='가족 등록하기' />
      <div className='p-5'>
        <PageTitle
          title={`가족 이름을
          설정해주세요`}
        />

        <input
          type='text'
          placeholder='가족 이름을 입력해주세요'
          value={familyName}
          onChange={handleInputChange}
          className='mt-[51px] w-full border-b border-[#b9b9b9] focus:outline-none focus:border-[#b9b9b9] text-appColor text-2xl text-center py-2'
        />
        <div className='text-right text-sm text-[#b9b9b9] mt-2'>
          {familyName.length}/20
        </div>
      </div>

      <div className='fixed bottom-0 left-0 w-full p-5'>
        <ButtonLarge
          text='다음'
          disabled={familyName.trim() === ''}
          onClick={handleNextClick}
        />
      </div>
    </div>
  );
};

export default RegisterFamily;
