import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import CreateMeeting from './CreateMeeting';

const page = () => {
  return (
    <div className='pageLayout defaultLayout'>
      <CreateMeeting />
    </div>
  );
};

export default page;
