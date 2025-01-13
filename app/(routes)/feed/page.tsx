'use client';

import PasswordInput from '@/components/atoms/Inputs/PasswordInput';
import PhoneInput from '@/components/atoms/Inputs/PhoneInput';
import PriceInput from '@/components/atoms/Inputs/PriceInput';
import RoleSelect from '@/components/atoms/Selects/RoleSelect';
import Toast from '@/components/atoms/Toast/ToastMessage';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

type Props = {};
type Role = '할아버지' | '할머니' | '아빠' | '엄마' | '손자' | '손녀';
const index = (props: Props) => {
  const [showToast, setShowToast] = useState(false);
  const [price, setPrice] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [role, setRole] = useState<Role | ''>('');

  useEffect(() => {
    console.log(role);
  }, [role]);

  return (
    <div>
      {/* <PasswordInput onPasswordChange={handlePasswordChange}></PasswordInput> */}
      {/* <Button onClick={() => setShowToast(true)}>open</Button>
      {showToast && <Toast message='가족이 변경되었습니다!' />} */}
      {/* <PriceInput value={price} onChange={setPrice} /> */}
      <div className='flex space-x-2'>
        <PhoneInput value={phone} onChange={setPhone} />
        <RoleSelect value={role} onChange={setRole}></RoleSelect>
      </div>
    </div>
  );
};

export default index;
