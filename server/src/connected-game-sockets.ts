import GameSocket from './game-socket';
import { formatBroadcastMessage } from './formatters';
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
    const newGameSocket = new GameSocket(this, socket, this.idCounter++);
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

  removeGameSocketById(id: number) {
    const { gameSockets } = this;
    for (let i = 0; i < gameSockets.length; i++) {
      if (gameSockets[i].id === id) {
        gameSockets.splice(i, 1);
      }
    }

    // broadcast new info
    this.broadcastAllGameSocketsInfo();
  }
}

export default ConnectedGameSockets;
