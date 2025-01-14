import Alarm from '@/components/atoms/Alarm/Alarm';
import { TAlarm } from '@/types/Alarm';

type AlarmListProps = {
  list: TAlarm[];
};

const AlarmList = ({ list }: AlarmListProps) => {
  return (
    <div className='flex flex-col'>
      {list.map((alarm) => {
        return <Alarm key={alarm.alarm_id} data={alarm}></Alarm>;
      })}
    </div>
  );
};

export default AlarmList;
