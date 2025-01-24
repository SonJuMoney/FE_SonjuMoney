'use client';

import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useRef } from 'react';
import SocketManager from '@/lib/websocket';

const SocketContext = createContext<SocketManager | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket 연결
    // const ws = new WebSocket();
    if (!session?.user?.accessToken) return;
    const protocols = ['Bearer', session.user.accessToken];
    const ws = new WebSocket(
      'ws://dev.sonjumoney.topician.com/ws/alarms',
      protocols
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [session?.user?.accessToken]);

  return (
    <SocketContext.Provider value={SocketManager.getInstance()}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
