export type FamilyCardProps = {
  familyName: string;
  familyMember: string[];
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
      className={`p-5 rounded-2xl shadow-md ${color} cursor-pointer`}
    >
      <h2 className='text-2xl font-semibold text-white mb-5'>{familyName}</h2>
      <div className='grid grid-cols-6 gap-2'>
        {familyMember.map((member, index) => (
          <div
            key={index}
            className='rounded-full bg-white w-10 h-10 flex items-center justify-center'
          >
            <span className='text-xs font-semibold text-appColor'>
              {member}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyCardLarge;
