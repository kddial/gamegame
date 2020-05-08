import { formatGameSocketInfo, formatSelfInfo } from './formatters';
import { WebSocket } from '@clusterws/cws';
import ConnectedGameSockets from './connected-game-sockets';
import {
  MSG_PLAYER,
  MSG_TYPE_DELIM,
  MSG_DATA_DELIM,
} from './client/socket-constants.js';

class GameSocket {
  connectedGameSockets: ConnectedGameSockets;
  socket: WebSocket;
  id: number;
  x: number;
  y: number;
  pose: string;
  horizontalScale: number;

  constructor(
    connectedGameSockets: ConnectedGameSockets,
    serverSocket: WebSocket,
    id: number,
  ) {
    this.socket = serverSocket;
    this.id = id;
    this.connectedGameSockets = connectedGameSockets;

    this.socket.on('close', this.onSocketClose);
    this.socket.on('message', this.onSocketMessage);
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

  onSocketMessage = (message: string) => {
    const [messageType, messageData] = message.split(MSG_TYPE_DELIM);

    if (messageType === MSG_PLAYER) {
      const [x, y, pose, horizontalScale] = messageData.split(MSG_DATA_DELIM);
      this.x = parseInt(x);
      this.y = parseInt(y);
      this.pose = pose;
      this.horizontalScale = parseInt(horizontalScale);
    }
  };
}

export default GameSocket;
