import UserCheckBox from '@/components/atoms/CheckBoxes/UserCheckBox';
import { Child } from '@/types/User';

type Props = {
  childs: Child[];
  selectedChilds?: Child[];
  onSelected: (childs: Child[]) => void;
};

const MemberCard = ({ childs, selectedChilds = [], onSelected }: Props) => {
  const handleSelectChild = (child: Child) => {
    if (selectedChilds.find((selected) => selected.user_id === child.user_id)) {
      onSelected(
        selectedChilds.filter((selected) => selected.user_id !== child.user_id)
      );
    } else {
      onSelected([...selectedChilds, child]);
    }
  };

  return (
    <div className='flex flex-col w-full space-y-2'>
      {childs.map((child) => (
        <div
          key={child.user_id}
          className={`w-full flex space-x-4 p-4 border rounded-[12px] items-center ${
            selectedChilds.some(
              (selected) => selected.user_id === child.user_id
            )
              ? 'text-appColor border-appColor'
              : 'text-black border-placeHolder'
          }`}
        >
          <UserCheckBox
            checked={selectedChilds.some(
              (selected) => selected.user_id === child.user_id
            )}
            onChange={() => handleSelectChild(child)}
          />
          <div className='text-[15px] font-bold'>{child.user_name}</div>
        </div>
      ))}
    </div>
  );
};

export default MemberCard;
