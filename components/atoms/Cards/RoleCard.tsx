import Image from 'next/image';

export type Role = {
  image: string;
  name: string;
};

// 이미지 추가
const RoleCard = ({ image, name }: Role) => {
  return (
    <div className='flex flex-col items-center bg-white rounded-2xl border border-disabled hover:border-appColor p-3 w-40 h-[180px]'>
      <div className='flex items-center justify-center w-[120px] h-[120px] rounded-full bg-secondary/20 mb-3'>
        <Image src={image} alt={name} className='' />
      </div>
      <p className='text-[15px] font-semibold text-appColor'>{name}</p>
    </div>
  );
};

export default RoleCard;
