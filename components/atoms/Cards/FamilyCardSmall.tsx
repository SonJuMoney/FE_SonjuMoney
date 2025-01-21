import { FamilyCardProps } from './FamilyCardLarge';

const FamilyCardSmall = ({
  familyName,
  familyMember,
  color,
  onClick,
}: FamilyCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl shadow-md ${color} cursor-pointer`}
    >
      <h2 className='text-xs font-semibold text-white mb-2'>{familyName}</h2>
      <div className='flex gap-2'>
        {familyMember.map((member, index) => (
          <div
            key={index}
            className='rounded-full bg-white w-10 h-10 flex items-center justify-center'
          >
            <span className='text-[10px] font-semibold text-appColor'>
              {member.member_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyCardSmall;
