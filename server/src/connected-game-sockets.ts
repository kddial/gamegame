import GameSocket from './game-socket';
import { formatBroadcastMessage } from './constants';

class ConnectedGameSockets {
  idCounter: number;
  gameSockets: any; // TODO?? an array of WebSockets
  wsServer: any; // TODO Websocketserver

  constructor(wsServer) {
    this.idCounter = 1000;
    this.gameSockets = [];
    this.wsServer = wsServer;
  }

  connectSocket(socket) {
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
