import BankCheckBox from '@/components/atoms/CheckBoxes/BankCheckBox';
import { Account } from '@/types/Account';

type Props = {
  accounts: Account[];
  selectedAccount?: Account;
  onSelectAccount: (account: Account) => void;
};

const AccountList = ({ accounts, selectedAccount, onSelectAccount }: Props) => {
  return (
    <div className='flex flex-col space-y-4'>
      {accounts.map((account, index) => (
        <div
          key={index}
          className='w-full flex space-x-4 justify-start items-center'
        >
          <BankCheckBox
            checked={selectedAccount?.account_num === account.account_num}
            onChange={() => onSelectAccount(account)}
          />
          <div className='flex flex-col font-semibold justify-center text-md'>
            <div className='text-darkGray '>{account.account_name}</div>
            <div className='text-black '>
              {account.balance.toLocaleString()}원
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccountList;
