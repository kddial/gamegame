import https from 'https';
import http from 'http';

import { WebSocketServer } from '@clusterws/cws';
import ConnectedSockets from './connected-game-sockets';
import handler from 'serve-handler';
import path from 'path';
import fs from 'fs';
import os from 'os';
import VisitMetrics from './visit-metrics';

const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || '127.0.0.1';

const visitMetricsInstance = new VisitMetrics();

const server = http.createServer({}, async (req, res) => {
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

  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`health check passed.`);
    return;
  }

  // serve static html & image files
  return handler(req, res, {
    public: path.join(__dirname, '..', '..', 'client'),
    directoryListing: false,
  });
});

server.on('error', (err) => {
  console.log('ERROR: https server error');
  console.error(err);
});

const wsServer = new WebSocketServer({
  server: server,
});
wsServer.startAutoPing(10000, true); // check if clients are alive, every 10 sec

const connectedSocketsInstance = new ConnectedSockets(wsServer);

server.listen(
  {
    host: HOST,
    port: PORT,
  },
  () => {
    console.log(`LOG: running on http://${HOST}:${PORT}`);
  },
);

wsServer.on('connection', (socket, req) => {
  console.log('LOG: new web socket connection');
  connectedSocketsInstance.connectSocket(socket);
});

wsServer.on('error', (err) => {
  console.log('ERROR: web socket server error');
  console.error(err);
});
