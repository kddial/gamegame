import { formatGameSocketInfo, formatSelfInfo } from './constants';
import { WebSocketServer, WebSocket } from '@clusterws/cws';

class GameSocket {
  socket: WebSocket;
  id: number;

  constructor(serverSocket: WebSocket, id: number) {
    this.socket = serverSocket;
    this.id = id;

    this.sendSelfFormattedInfo();
  }

  sendSelfFormattedInfo() {
    const selfFormattedInfo = formatSelfInfo(this.getFormattedInfo());
    this.socket.send(selfFormattedInfo);
  }

  getFormattedInfo() {
    return formatGameSocketInfo(this.id);
  }
}

export default GameSocket;
