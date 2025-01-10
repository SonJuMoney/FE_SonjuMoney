import RoleCard from '@/components/atoms/Cards/RoleCard';

type Props = {};

const index = (props: Props) => {
  return (
    <div className='w-[335px] h-[375px] grid grid-cols-2'>
      <RoleCard image='' name='할아버지' />
      <RoleCard image='' name='아빠' />
      <RoleCard image='' name='아들' />
    </div>
  );
};

export default index;
