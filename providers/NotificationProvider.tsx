'use client';

import { CustomToast } from '@/components/ui/customToast';
import { useToast } from '@/hooks/use-toast';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useState, useEffect } from 'react';

export type Notification = {
  id: number;
  title: string;
  message: string;
};

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();
  const { data: session } = useSession();

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, { ...notification }]);
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  useEffect(() => {
    if (!session?.user?.accessToken) return;

    const ws = new WebSocket('ws://dev.sonjumoney.topician.com/ws/alarms');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      // const data = JSON.parse(event.data);
      // addNotification({
      //   id: data.id,
      //   title: 'New Notification',
      //   message: data.message,
      // });
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [session?.user?.accessToken]);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
      {notifications.length > 0 && (
        <CustomToast notifications={notifications} />
      )}
    </NotificationContext.Provider>
  );
}
