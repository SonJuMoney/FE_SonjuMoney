import { io, Socket } from 'socket.io-client';

class SocketManager {
  private static instance: Socket | null = null;
  private static isConnected: boolean = false;

  static getInstance(): Socket {
    if (!this.instance) {
      this.instance = io('ws://dev.sonjumoney.topician.com/ws/alarms', {
        transports: ['websocket'],
        autoConnect: false,
        withCredentials: true, // 쿠키 전송을 위해 필요
      });

      // 연결 상태 모니터링
      this.instance.on('connect', () => {
        console.log('소켓 연결 성공');
        this.isConnected = true;
      });

      this.instance.on('connect_error', (error) => {
        console.error('소켓 연결 에러:', error.message);
        this.isConnected = false;
      });

      this.instance.on('disconnect', () => {
        console.log('소켓 연결 해제');
        this.isConnected = false;
      });
    }
    return this.instance;
  }

  static connect() {
    if (this.instance) {
      this.instance.connect();
      console.log('소켓 연결');
    }
  }

  static disconnect() {
    if (this.instance) {
      this.instance.disconnect();
      console.log('소켓 연결 닫음');
      this.instance = null;
    }
  }
}

export default SocketManager;
