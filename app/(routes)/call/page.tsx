import VideoCallSwiper from '@/components/Calls/VideoCallSwiper';
import LogoHeader from '@/components/atoms/Headers/LogoHeader';
import PageTitle from '@/components/atoms/PageTitles/PageTitle';

export default function page() {
  return (
    <div className='flex flex-col h-full w-full max-w-[640px] mx-auto overflow-hidden bg-[#FAE4D4]'>
      <LogoHeader showFamily />
      <main className='flex-1 relative items-center h-full mb-20 py-[25px] px-5'>
        <PageTitle
          title={`화상통화로 가족들에게 
일상을 전해보세요`}
        />
        <VideoCallSwiper />
      </main>
    </div>
  );
}
