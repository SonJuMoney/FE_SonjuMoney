import RoleCard from '@/components/atoms/Cards/RoleCard';
import { getProfileImage } from '@/lib/utils';

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
          image={getProfileImage(role) || ''}
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
