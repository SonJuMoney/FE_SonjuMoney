import RoleCard from '@/components/atoms/Cards/RoleCard';
import { useState } from 'react';

type RoleListProps = {
  roles: string[];
};

const RoleList = ({ roles }: RoleListProps) => {
  const [selectedRole, setSelectedRole] = useState('');

  return (
    <div className='grid grid-cols-2 gap-5'>
      {roles.map((role, index) => (
        <RoleCard
          key={index}
          image='/Role1.png' // 역할에 따라 이미지 불러오기
          name={role}
          selected={selectedRole === role}
          onClick={() => {
            setSelectedRole((prevRole) => (prevRole === role ? '' : role));
          }}
        />
      ))}
    </div>
  );
};

export default RoleList;
