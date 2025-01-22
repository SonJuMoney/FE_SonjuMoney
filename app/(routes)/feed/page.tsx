import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import FeedList from './FeedList';

export default async function FeedPage() {
  return (
    <div className='pageLayout bg-[#FAE4D4]'>
      <LogoHeader showFamily />
      <FeedList />
    </div>
  );
}
