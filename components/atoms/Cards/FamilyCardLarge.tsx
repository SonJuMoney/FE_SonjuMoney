export type FamilyCardProps = {
  familyName: string;
  familyMember: string[];
  color: string;
};

const FamilyCardLarge = ({
  familyName,
  familyMember,
  color,
}: FamilyCardProps) => {
  return (
    <div className={`p-5 rounded-2xl shadow-md ${color}`}>
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

// 가족 선택 페이지
const selectFamily = () => {
  const families = [
    {
      familyName: '첫째네 가족',
      familyMember: ['준용', '미진', '형석', '서현'],
    },
    {
      familyName: '둘째네 가족',
      familyMember: ['준용', '미진', '형석', '서현'],
    },
    {
      familyName: '셋째네 가족',
      familyMember: ['준용', '미진', '형석', '서현'],
    },
    {
      familyName: '넷째네 가족',
      familyMember: ['준용', '미진', '형석', '서현'],
    },
  ];

  const colors = ['bg-appColor', 'bg-secondary', 'bg-pink'];

  return (
    <div className='p-10 space-y-4'>
      {families.map((family, index) => (
        <div key={index}>
          <FamilyCardLarge
            familyName={family.familyName}
            familyMember={family.familyMember}
            color={`${colors[index % colors.length]}`}
          />
        </div>
      ))}
    </div>
  );
};

export default FamilyCardLarge;
