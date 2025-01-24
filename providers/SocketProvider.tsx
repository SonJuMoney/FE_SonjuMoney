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
    const ws = new WebSocket('ws://dev.sonjumoney.topician.com/ws/alarms');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      alert('WebSocket connected');
    };

    ws.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      alert('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      alert('WebSocket error');
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
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
