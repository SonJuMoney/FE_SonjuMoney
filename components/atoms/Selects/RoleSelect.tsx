import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Role } from '@/types/User';
import { useCallback } from 'react';

type Props = {
  value: Role;
  onChange: (role: Role) => void;
};

const RoleSelect = ({ value, onChange }: Props) => {
  const roleOptions: Role[] = [
    '할아버지',
    '할머니',
    '아빠',
    '엄마',
    '손자',
    '손녀',
  ];

  const handleChange = useCallback(
    (value: string) => {
      onChange?.(value as Role);
    },
    [onChange]
  );

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger
        className={`w-[110px] font-pretendard text-sm ring-0 focus:ring-0 focus-visible:ring-0 data-[placeholder]:text-placeHolder ${
          value ? 'text-appColor border-appColor' : 'border border-disabled '
        }`}
      >
        <SelectValue placeholder='역할선택' />
      </SelectTrigger>
      <SelectContent className='min-w-0 w-[110px] max-h-[100px] overflow-y-auto'>
        {roleOptions.map((role) => (
          <SelectItem
            key={role}
            value={role}
            className='data-[state=checked]:text-appColor focus:bg-orange-50 focus:text-appColor'
          >
            {role}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RoleSelect;
