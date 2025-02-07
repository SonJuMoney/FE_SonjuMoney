import { TMember } from '@/types/Family';

export type FamilyCardProps = {
  familyName: string;
  familyMember: TMember[];
  color: string;
  onClick: () => void;
};

const FamilyCardLarge = ({
  familyName,
  familyMember,
  color,
  onClick,
}: FamilyCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl shadow-md ${color} cursor-pointer min-w-[200px]`}
    >
      <h2 className='text-2xl font-semibold text-white mb-5'>{familyName}</h2>
      <div className='flex gap-2'>
        {familyMember.map((member, index) => (
          <div
            key={index}
            className='rounded-full bg-white w-10 h-10 flex items-center justify-center'
          >
            <span className='text-xs font-semibold text-appColor'>
              {member.member_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyCardLarge;
