import { TAlarm } from '@/types/Alarm';
import Image from 'next/image';
import { formatUpdatedAt, getAlarmImage } from '@/lib/utils';

type AlarmProps = {
  data: TAlarm;
};

const Alarm = ({ data }: AlarmProps) => {
  return (
    <div className='flex gap-4 items-center border-b-[1px] border-disabled px-5 py-4'>
      <Image
        src={getAlarmImage(data.alarm_type)}
        width={55}
        height={55}
        alt='Alarm Icon'
      />
      <div className='flex flex-col gap-2 justify-between'>
        <span className='text-[15px] font-semibold'>{data.message}</span>
        <span className='text-placeHolder'>
          {formatUpdatedAt(data.created_at)}
        </span>
      </div>
    </div>
  );
};

export default Alarm;
