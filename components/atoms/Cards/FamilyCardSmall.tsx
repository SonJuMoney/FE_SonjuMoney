import { FamilyCardProps } from './FamilyCardLarge';

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
              {member.member_name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 가족 목록
// const familyList = () => {
//   const colors = ['bg-appColor', 'bg-secondary', 'bg-pink'];

//   return (
//     <div className='overflow-x-auto'>
//       <div className='flex space-x-4'>
//         {families.map((family, index) => (
//           <div key={family.family_id} className='shrink-0'>
//             <FamilyCardSmall
//               familyName={family.family_name}
//               familyMember={family.members}
//               color={`${colors[index % colors.length]}`}
//               onClick={() => {}} // 가족 소식 페이지로 연결?
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default FamilyCardSmall;
