import PhoneInput from '@/components/atoms/Inputs/PhoneInput';
import RoleSelect from '@/components/atoms/Selects/RoleSelect';
import DeleteIcon from '@/public/Icons/delete_gray_24.svg';
import { Role } from '@/types/user';

type Props = {
  phoneValue: string;
  phoneOnchange: (value: string) => void;
  roleValue: Role;
  roleOnchange: (value: Role) => void;
  onDelete: () => void;
};

const InviteCard = ({
  phoneValue,
  phoneOnchange,
  roleValue,
  roleOnchange,
  onDelete,
}: Props) => {
  return (
    <div className='w-full flex space-x-2 justify-center items-center'>
      <PhoneInput value={phoneValue} onChange={phoneOnchange} />
      <RoleSelect value={roleValue} onChange={roleOnchange} />
      {onDelete && (
        <button onClick={onDelete}>
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default InviteCard;
