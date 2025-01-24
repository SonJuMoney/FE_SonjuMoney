import {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/toast';
import { Notification } from '@/providers/NotificationProvider';

type CustomToastProps = {
  notifications: Notification[];
};

export function CustomToast({ notifications }: CustomToastProps) {
  return (
    <ToastProvider>
      {notifications.map(({ id, title, message }) => (
        <Toast
          key={id}
          className='w-full max-w-md bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden'
        >
          <div className='flex-1 w-0 p-4'>
            <div className='flex items-start'>
              <div className='flex-shrink-0 pt-0.5'>
                <span className='text-2xl'>🔔</span>
              </div>
              <div className='ml-3 flex-1'>
                <ToastTitle className='text-sm font-medium text-gray-900'>
                  {title}
                </ToastTitle>
                <ToastDescription className='mt-1 text-sm text-gray-500'>
                  {message}
                </ToastDescription>
              </div>
            </div>
          </div>
        </Toast>
      ))}
      <ToastViewport className='fixed top-0 left-0 right-0 flex flex-col p-4 gap-2 w-full max-w-md m-auto z-50' />
    </ToastProvider>
  );
}
