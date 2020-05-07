import GameSocket from './game-socket';
import { formatBroadcastMessage } from './constants';
import { WebSocketServer, WebSocket } from '@clusterws/cws';

class ConnectedGameSockets {
  idCounter: number;
  gameSockets: Array<GameSocket>;
  wsServer: WebSocketServer;

  constructor(wsServer: WebSocketServer) {
    this.idCounter = 1000;
    this.gameSockets = [];
    this.wsServer = wsServer;
  }

  connectSocket(socket: WebSocket) {
    const newGameSocket = new GameSocket(socket, this.idCounter++);
    this.gameSockets.push(newGameSocket);
    this.broadcastAllGameSocketsInfo();
  }

  broadcastAllGameSocketsInfo() {
    let broadcastMessage = '';
    this.gameSockets.forEach((gameSocket) => {
      broadcastMessage += gameSocket.getFormattedInfo();
    });

    this.wsServer.broadcast(formatBroadcastMessage(broadcastMessage));
  }
}

export default ConnectedGameSockets;
