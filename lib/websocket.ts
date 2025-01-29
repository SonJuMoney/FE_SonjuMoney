// // lib/websocket.ts
// import { io, Socket } from 'socket.io-client';

// class SocketManager {
//   private static instance: SocketManager;
//   private socket: Socket | null = null;

//   private constructor() {}

//   static getInstance(): SocketManager {
//     if (!SocketManager.instance) {
//       SocketManager.instance = new SocketManager();
//     }
//     return SocketManager.instance;
//   }

//   connect() {
//     if (this.socket?.connected) return;

//     this.socket = io('ws://dev.sonjumoney.topician.com', {
//       autoConnect: false,
//       path: '/ws/alarms',
//       transports: ['websocket'],
//     });

//     this.socket.connect();

//     this.socket.on('connect', () => {
//       console.log('Socket connected');
//       alert('Socket connected');
//     });

//     this.socket.on('connect_error', (error) => {
//       console.error('Socket connection error:', error);
//       alert(`Socket connection error: ${error}`);
//     });
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//     }
//   }

//   getSocket(): Socket | null {
//     return this.socket;
//   }
// }

// export default SocketManager;
