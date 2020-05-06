// kevin

import { createServer } from 'http';
import { WebSocketServer, WebSocket } from '@clusterws/cws';

const PORT = 2000;
const http = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(
    `
    <html>
    <head><title>game game</title></head>
    <body>
    game game
    <script>
      console.log("kevin");
      const socket = new WebSocket("ws://localhost:${PORT}");
    </script>
    </body>
    </html>
    `,
  );
});
const wsServer = new WebSocket.Server({
  server: http,
});

http.listen(PORT, () => {
  console.log(`running on  http://localhost:${PORT}`);
});

wsServer.on('connection', (ws, req) => {
  console.log('web socket connection init');
});
