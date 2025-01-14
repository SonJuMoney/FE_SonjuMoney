import { ButtonAccountCard } from '@/components/atoms/Buttons/ButtonAccountCard';
import { Card } from '@/components/atoms/Cards/Card';

type AccountCardProps = {
  accountName: string;
  accountBalance: number;
  onClick?: () => void;
};

const AccountCard = ({
  accountName,
  accountBalance,
  onClick,
}: AccountCardProps) => {
  return (
    <Card>
      <div className='text-neutral-800 text-sm font-semibold mb-2'>
        {accountName}
      </div>

      <div className='flex items-center gap-[5px] mb-5'>
        <div className='text-black text-3xl font-bold'>
          {accountBalance.toLocaleString()}
        </div>
        <div className='text-black text-[25px] font-semibold'>원</div>
      </div>

      <ButtonAccountCard text='용돈 보내기' onClick={onClick} />
    </Card>
  );
};

export default AccountCard;
