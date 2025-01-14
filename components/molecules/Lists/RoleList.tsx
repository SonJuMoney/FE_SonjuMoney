import RoleCard from '@/components/atoms/Cards/RoleCard';

type RoleListProps = {
  roles: string[];
  selectedRole: string;
  setSelectedRole: (role: string) => void;
};

const RoleList = ({ roles, selectedRole, setSelectedRole }: RoleListProps) => {
  return (
    <div className='grid grid-cols-2 gap-5'>
      {roles.map((role, index) => (
        <RoleCard
          key={index}
          image='/Role1.png' // 역할에 따라 이미지 불러오기
          name={role}
          selected={selectedRole === role}
          onClick={() => {
            setSelectedRole(selectedRole === role ? '' : role);
            console.log('selectedRole: ' + (selectedRole === role ? '' : role));
          }}
        />
      ))}
    </div>
  );
};

export default RoleList;
