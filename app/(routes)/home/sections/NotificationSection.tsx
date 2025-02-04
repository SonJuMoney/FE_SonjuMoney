'use client';

import AlarmCard from '@/components/atoms/Cards/AlarmCard';
import { useNotification } from '@/providers/NotificationProvider';

const NotificationSection = () => {
  const { notifications } = useNotification();
  const latestNotification = notifications[notifications.length - 1];
  console.log(latestNotification);

  if (!latestNotification || latestNotification.status === 'CHECKED') {
    return null;
  } else
    return (
      <div className='p-5'>
        {latestNotification && (
          <AlarmCard
            key={latestNotification.alarm_id}
            data={latestNotification}
          />
        )}
      </div>
    );
};

export default NotificationSection;
