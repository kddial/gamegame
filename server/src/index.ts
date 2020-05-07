// kevin

import { createServer } from 'http';
import { WebSocketServer } from '@clusterws/cws';
import fs from 'fs';
import ConnectedSockets from './connected-game-sockets';

const PORT = 2000;
const http = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.createReadStream('./src/html_client.html').pipe(res);
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
