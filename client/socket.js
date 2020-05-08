const {
  MSG_SELF,
  MSG_BROADCAST,
  MSG_PLAYER,
  MSG_TYPE_DELIM,
} = window.gamegame.CONSTANTS;

const PORT = 2000; // web socket port
const PING = 57;
const PONG = new Uint8Array(['A'.charCodeAt()]);

class Socket {
  constructor() {
    this.socket = new WebSocket(`ws://localhost:${PORT}`);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = this.onOpen;
    this.socket.onerror = this.onError;
    this.socket.onclose = this.onClose;
    this.socket.onmessage = this.onMessage;
    this.frameCounter = 0;
  }

  onOpen = (event) => {
    console.log('-- on open');
  };

  onError = (err) => {
    console.error(err);
  };

  onClose = (event) => {
    console.log('-- on close');
    this.socket = null;
  };

  onMessage = (event) => {
    const data = event.data;

    // server has ping me(client), i must pong back to server.
    if (typeof data !== 'string') {
      // transform to UInt8Array
      let buffer = new Uint8Array(data);

      if (buffer.length === 1 && buffer[0] === PING) {
        this.send(PONG);
        return;
      }
    }

    const [messageType, restData] = data.split(MSG_TYPE_DELIM);
    if (messageType === MSG_SELF) {
      const selfInfo = restData;
      document.getElementById('self-info').innerHTML = selfInfo;
      return;
    } else if (messageType === MSG_BROADCAST) {
      const broadcastInfo = restData;
      document.getElementById('broadcast-info').innerHTML = broadcastInfo;
      return;
    }
  };

  sendPlayerInfo = (player) => {
    const sendEveryNFrame = 10;
    const { x, y, pose, horizontalScale } = player;
    const socketMessage = `${MSG_PLAYER}${MSG_TYPE_DELIM}${x}__${y}__${pose}__${horizontalScale}`;

    // dont spam the server with results every frame
    // send at every 10 frames instead
    if (this.frameCounter === 0) {
      this.send(socketMessage);
      this.frameCounter++;
    } else if (this.frameCounter === sendEveryNFrame) {
      this.frameCounter = 0;
    } else {
      this.frameCounter++;
    }
  };

  send = (message) => {
    if (this.socket) {
      this.socket.send(message);
    }
  };
}

export default Socket;
