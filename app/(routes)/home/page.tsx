import { getMyAccount } from '@/app/actions/accounts';
import { getFamilies } from '@/app/actions/family';
import { getSavingsAccounts } from '@/app/actions/savings';
import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import { Suspense } from 'react';
import AccountSection from './sections/AccountSection';
import FamilySection from './sections/FamilySection';
import NotificationSection from './sections/NotificationSection';
import SavingsSection from './sections/SavingsSection';

export default function HomePage() {
  return (
    <div className='pageLayout bg-[#FAE4D4]'>
      <LogoHeader showFamily={false} />
      <div className='flex flex-col  overflow-y-scroll mb-20'>
        <NotificationSection />

        <div className='p-5'>
          <AccountSection />
        </div>
        <div>
          <FamilySection />
        </div>
        <div className='p-5'>
          <SavingsSection />
        </div>
      </div>
    </div>
  );
}
