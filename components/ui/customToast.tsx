import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
} from '@/components/ui/toast';
import { TAlarm } from '@/types/Alarm';

type CustomToastProps = {
  notifications: TAlarm[];
};

export function CustomToast({ notifications }: CustomToastProps) {
  return (
    <ToastProvider>
      {notifications.map(({ alarm_id, message }) => (
        <Toast
          key={alarm_id}
          className='w-full max-w-md bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden'
        >
          <div className='flex-1 w-0 p-4'>
            <div className='flex items-start'>
              <div className='flex-shrink-0 pt-0.5'>
                <span className='text-2xl'>🔔</span>
              </div>
              <div className='ml-3 flex-1'>
                <ToastTitle className='text-sm font-medium text-gray-900'>
                  {message}
                </ToastTitle>
              </div>
            </div>
          </div>
        </Toast>
      ))}
      <ToastViewport className='fixed top-0 left-0 right-0 flex flex-col p-4 gap-2 w-full max-w-md m-auto z-50' />
    </ToastProvider>
  );
}
