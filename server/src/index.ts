import https from 'https';
import { WebSocketServer } from '@clusterws/cws';
import ConnectedSockets from './connected-game-sockets';
import handler from 'serve-handler';
import path from 'path';
import fs from 'fs';
import os from 'os';
import VisitMetrics from './visit-metrics';

const PORT = 2000;

const options = {
  cert: fs.readFileSync(os.homedir() + '/.gamegame/https.cert'),
  key: fs.readFileSync(os.homedir() + '/.gamegame/https.key'),
};

const visitMetricsInstance = new VisitMetrics();

const server = https.createServer(options, async (req, res) => {
  if (req.method === 'POST' && req.url === '/new-visit') {
    console.log('LOG: new visit metric added');
    visitMetricsInstance.addNewVisitDataPoint();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('success');
    return;
  }

  if (req.method === 'GET' && req.url === '/visits') {
    const visits = await visitMetricsInstance.getTotalVisits();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${visits}`);
    return;
  }

  // serve static html & image files
  return handler(req, res, {
    public: path.join(__dirname, '..', '..', 'client'),
    directoryListing: false,
  });
});

const wsServer = new WebSocketServer({
  server: server,
});
wsServer.startAutoPing(10000, true); // check if clients are alive, every 10 sec

const connectedSocketsInstance = new ConnectedSockets(wsServer);

server.listen(PORT, () => {
  console.log(`LOG: running on https://localhost:${PORT}`);
});

wsServer.on('connection', (socket, req) => {
  console.log('LOG: new web socket connection');
  connectedSocketsInstance.connectSocket(socket);
});
