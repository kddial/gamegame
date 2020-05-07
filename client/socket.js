const PORT = 2000;
const SELF = 'SELF';
const BROADCAST = 'BROADCAST';
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
  }

  onOpen = (event) => {
    console.log('-- on open');
  };

  onError = (err) => {
    console.error(err);
  };

  onClose = (event) => {
    console.log('-- on close');
  };

  onMessage = (event) => {
    const data = event.data;

    // server has ping me(client), i must pong back to server.
    if (typeof data !== 'string') {
      // transform to UInt8Array
      let buffer = new Uint8Array(data);

      if (buffer.length === 1 && buffer[0] === PING) {
        this.socket.send(PONG);
        return;
      }
    }

    const [messageType, restData] = data.split('::');
    if (messageType === SELF) {
      const selfInfo = restData;
      document.getElementById('self-info').innerHTML = selfInfo;
      return;
    } else if (messageType === BROADCAST) {
      const broadcastInfo = restData;
      document.getElementById('broadcast-info').innerHTML = broadcastInfo;
      return;
    }
  };
}

export default Socket;
