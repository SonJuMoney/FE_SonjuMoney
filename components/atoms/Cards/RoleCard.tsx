import Image from 'next/image';

type RoleCardProps = {
  image: string;
  name: string;
  selected: boolean;
  onClick: () => void;
};

const RoleCard = ({ image, name, onClick, selected }: RoleCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center bg-white rounded-2xl border p-3 ${
        selected ? 'border-appColor' : 'border-disabled'
      }`}
    >
      <div className='flex items-center justify-center w-[120px] h-[120px] rounded-full bg-secondary/20 mb-3'>
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className='object-cover'
        />
      </div>
      <p className='text-[15px] font-semibold text-appColor'>{name}</p>
    </div>
  );
};

export default RoleCard;
