import Header from '@/components/atoms/Headers/Header';
import AlarmList from './AlarmList';

const page = () => {
  return (
    <div className='pageLayout'>
      <Header title='알림' />
      <div className='pageLayout overflow-y-scroll'>
        <AlarmList />
      </div>
    </div>
  );
};

export default page;
