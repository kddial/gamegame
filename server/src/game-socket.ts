import { formatGameSocketInfo, formatSelfInfo } from './constants';
import { WebSocket } from '@clusterws/cws';
import ConnectedGameSockets from './connected-game-sockets';

class GameSocket {
  connectedGameSockets: ConnectedGameSockets;
  socket: WebSocket;
  id: number;

  constructor(
    connectedGameSockets: ConnectedGameSockets,
    serverSocket: WebSocket,
    id: number,
  ) {
    this.socket = serverSocket;
    this.id = id;
    this.connectedGameSockets = connectedGameSockets;

    this.socket.on('close', this.onSocketClose);
    this.sendSelfFormattedInfo();
  }

  sendSelfFormattedInfo() {
    const selfFormattedInfo = formatSelfInfo(this.getFormattedInfo());
    this.socket.send(selfFormattedInfo);
  }

  getFormattedInfo() {
    return formatGameSocketInfo(this.id);
  }

  onSocketClose = () => {
    this.connectedGameSockets.removeGameSocketById(this.id);
  };
}

export default GameSocket;
