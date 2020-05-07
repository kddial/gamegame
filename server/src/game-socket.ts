import { formatGameSocketInfo, formatSelfInfo } from './constants';

class GameSocket {
  constructor(serverSocket, id) {
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
