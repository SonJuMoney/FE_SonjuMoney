import { getMyAccount } from '@/app/actions/accounts';
import { getFamilies } from '@/app/actions/family';
import { getSavingsAccounts } from '@/app/actions/savings';
import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import { Suspense } from 'react';
import AccountSection from './sections/AccountSection';
import FamilySection from './sections/FamilySection';
import SavingsSection from './sections/SavingsSection';

export default async function Home() {
  return (
    <div className='pageLayout bg-[#FAE4D4]'>
      <LogoHeader showFamily={false} />
      <div className='flex flex-col gap-5 overflow-y-scroll mb-20'>
        <div className='p-5'>
          <Suspense
            fallback={<AccountSection account={null} isLoading={true} />}
          >
            <AccountSectionWrapper />
          </Suspense>
        </div>
        <div>
          <Suspense
            fallback={<FamilySection families={null} isLoading={true} />}
          >
            <FamilySectionWrapper />
          </Suspense>
        </div>
        <div className='p-5'>
          <Suspense
            fallback={<SavingsSection savings={null} isLoading={true} />}
          >
            <SavingsSectionWrapper />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function AccountSectionWrapper() {
  const account = await getMyAccount();
  return <AccountSection account={account} isLoading={false} />;
}

async function FamilySectionWrapper() {
  const families = await getFamilies();
  return <FamilySection families={families} isLoading={false} />;
}

async function SavingsSectionWrapper() {
  const savings = await getSavingsAccounts();
  return savings?.is_child ? null : (
    <SavingsSection savings={savings} isLoading={false} />
  );
}
