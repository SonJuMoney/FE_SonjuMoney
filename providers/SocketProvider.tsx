'use client';

import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect } from 'react';
import SocketManager from '@/lib/websocket';

const SocketContext = createContext<SocketManager | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    const socketManager = SocketManager.getInstance();

    if (session?.user?.accessToken) {
      socketManager.connect(session.user.accessToken);
    } else {
      socketManager.disconnect();
    }

    return () => {
      socketManager.disconnect();
    };
  }, [session]);

  return (
    <SocketContext.Provider value={SocketManager.getInstance()}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
