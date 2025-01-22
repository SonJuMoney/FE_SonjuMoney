import BankCheckBox from '@/components/atoms/CheckBoxes/BankCheckBox';
import { TAccount } from '@/types/Account';

type Props = {
  accounts: TAccount[];
  selectedAccount?: number;
  onSelectAccount: (accountId: number) => void;
};

const AccountList = ({ accounts, selectedAccount, onSelectAccount }: Props) => {
  return (
    <div className='flex flex-col'>
      {accounts.map((account, index) => (
        <div
          key={index}
          className='w-full flex space-x-4 justify-start items-center py-[12px]'
          onClick={() => onSelectAccount(account.mockacc_id)}
        >
          <BankCheckBox
            checked={selectedAccount === account.mockacc_id}
            onChange={() => onSelectAccount(account.mockacc_id)}
          />
          <div className='flex flex-col font-semibold justify-center text-md'>
            <div
              className={`text-[16px] font-semibold ${
                selectedAccount === account.mockacc_id
                  ? 'text-appColor'
                  : 'text-black'
              }`}
            >
              {account.account_name}
            </div>
            <div className='text-black text-[16px]'>
              {account.balance.toLocaleString()}원
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountList;
