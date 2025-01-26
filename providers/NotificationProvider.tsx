'use client';

import { CustomToast } from '@/components/ui/customToast';
import { useToast } from '@/hooks/use-toast';
import { TAlarm } from '@/types/Alarm';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useState, useEffect } from 'react';

type NotificationContextType = {
  notifications: TAlarm[];
  addNotification: (notification: TAlarm) => void;
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
  const [notifications, setNotifications] = useState<TAlarm[]>([]);
  const { data: session } = useSession();

  const addNotification = (notification: TAlarm) => {
    setNotifications((prev) => [...prev, { ...notification }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.alarm_id !== id)
    );
  };

  useEffect(() => {
    if (!session?.user?.accessToken) return;

    const ws = new WebSocket(
      `ws://dev.sonjumoney.topician.com/ws/alarms?userId=${session.user.userId}`
    );

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.alarm_id) addNotification(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
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
  }, [session?.user?.userId, session?.user?.accessToken]);

  // useEffect(() => {
  //   // 임의의 알림 추가
  //   const testNotification: TAlarm = {
  //     alarm_id: 1,
  //     alarm_type: 'BIRTHDAY',
  //     message: 'This is a test notification',
  //     link_id: 0,
  //     created_at: new Date().toISOString(),
  //     status: 'RECEIVED',
  //   };
  //   addNotification(testNotification);
  // }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
