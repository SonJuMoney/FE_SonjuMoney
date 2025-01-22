import { Card } from '@/components/atoms/Cards/Card';
import RegisterCardSmall from '@/components/atoms/Cards/RegisterCardSmall';
import BankCheckBox from '@/components/atoms/CheckBoxes/BankCheckBox';
import { TSavings } from '@/types/Account';

type AccountListCardProps = {
  accounts: TSavings[];
  selectedAccount?: number;
  onSelectAccount: (accountId: number) => void;
  onButtonClick?: () => void;
  onClick?: () => void;
};

const AccountListCard = ({
  accounts,
  selectedAccount,
  onSelectAccount,
  onButtonClick,
  onClick,
}: AccountListCardProps) => {
  return (
    <Card padding='px-6 py-5 gap-3'>
      <div className='flex flex-col'>
        {accounts.map((account, index) => (
          <div
            key={index}
            className='w-full flex justify-between items-center py-[12px]'
          >
            <div
              onClick={() => onSelectAccount(account.account_id)}
              className='flex space-x-4'
            >
              <BankCheckBox
                checked={selectedAccount === account.account_id}
                onChange={() => onSelectAccount(account.account_id)}
              />
              <div className='flex flex-col font-semibold justify-center text-md cursor-pointer'>
                <div className='text-[16px] font-semibold text-black'>
                  {account.account_name}
                </div>
                <div className='text-black text-[16px]'>
                  {account.balance.toLocaleString()}원
                </div>
              </div>
            </div>

            <div
              onClick={onButtonClick}
              className='px-[11px] py-2 bg-appColor rounded-xl cursor-pointer'
            >
              <div className='text-white text-xs font-bold'>적금 보내기</div>
            </div>
          </div>
        ))}
      </div>
      <RegisterCardSmall text={'아이 적금 만들기'} onClick={onClick} />
    </Card>
  );
};

export default AccountListCard;
