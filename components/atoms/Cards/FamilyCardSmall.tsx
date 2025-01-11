import { FamilyCardProps } from '@/types/family';

const FamilyCardSmall = ({
  familyName,
  familyMember,
  color,
}: FamilyCardProps) => {
  return (
    <div className={`p-5 rounded-2xl shadow-md ${color}`}>
      <h2 className='text-xs font-semibold text-white mb-2'>{familyName}</h2>
      <div className='grid grid-cols-4 gap-1'>
        {familyMember.map((member, index) => (
          <div
            key={index}
            className='rounded-full bg-white w-6 h-6 flex items-center justify-center'
          >
            <span className='text-[10px] font-semibold text-appColor'>
              {member}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 가족 목록
const familyList = () => {
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
    <div className='overflow-x-auto'>
      <div className='flex space-x-4'>
        {families.map((family, index) => (
          <div key={index} className='shrink-0'>
            <FamilyCardSmall
              familyName={family.familyName}
              familyMember={family.familyMember}
              color={`${colors[index % colors.length]}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyCardSmall;
