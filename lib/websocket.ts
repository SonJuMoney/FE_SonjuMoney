import { auth } from '@/lib/auth';

export type WebSocketMessage = {
  type: string;
  payload?: unknown;
};

export class WebSocketManager {
  private socket: WebSocket | null = null;

  async connect(url: string): Promise<void> {
    const session = await auth();

    if (!session || !session.user?.accessToken) {
      console.error('Session or accessToken not found');
      return;
    }
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(url, [`${session.user?.accessToken}`]);
      console.log(this.socket);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }

  send(message: WebSocketMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  onMessage(callback: (data: WebSocketMessage) => void): void {
    if (this.socket) {
      this.socket.onmessage = (event: MessageEvent) => {
        const data: WebSocketMessage = JSON.parse(event.data);
        callback(data);
      };
    }
  }
}

export const webSocketManager = new WebSocketManager();
