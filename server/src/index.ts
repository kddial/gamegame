import { createServer } from 'http';
import { WebSocketServer } from '@clusterws/cws';
import ConnectedSockets from './connected-game-sockets';
import handler from 'serve-handler';

const PORT = 2000;
const http = createServer((req, res) => {
  // serve static files
  return handler(req, res, {
    public: 'src/client',
  });
});

const wsServer = new WebSocketServer({
  server: http,
});
wsServer.startAutoPing(10000, true); // check if clients are alive, every 10 sec

const connectedSocketsInstance = new ConnectedSockets(wsServer);

http.listen(PORT, () => {
  console.log(`running on  http://localhost:${PORT}`);
});

wsServer.on('connection', (socket, req) => {
  console.log('web socket connection init');
  connectedSocketsInstance.connectSocket(socket);
});

// todo for multiplayer
// server: assign a unique id to each socket (player)
// server: assign (x, y) coordinates to each player
// client: display its player's id, and display all players ID and their x,y coordinates
// server: continously update physics positions
// client: also update physics, but check with server physics and keep things in sync every few frames.
