'use client';

import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { webSocketManager } from '@/lib/websocket';

type WebSocketContextType = {
  connect: (url: string) => void;
  disconnect: () => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const { data: session } = useSession();

  const connect = (url: string) => {
    if (!isConnected) {
      webSocketManager.connect(url);
      setIsConnected(true);
    }
  };

  const disconnect = () => {
    if (isConnected) {
      webSocketManager.disconnect();
      setIsConnected(false);
    }
  };

  useEffect(() => {
    // 페이지가 닫힐 때 웹소켓 연결 해제
    const handleBeforeUnload = () => {
      disconnect();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      disconnect();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isConnected]);

  useEffect(() => {
    if (session?.user && !isConnected) {
      webSocketManager.connect('ws://dev.sonjumoney.topician.com/ws/alarms');
      setIsConnected(true);
    }
  }, [session, isConnected]);

  return (
    <WebSocketContext.Provider value={{ connect, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      'useWebSocketContext must be used within a WebSocketProvider'
    );
  }
  return context;
};
