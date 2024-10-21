import http, { IncomingMessage, ServerResponse } from 'node:http';
import { getRouter, postRouter, putRouter, deleteRouter } from './router.js';
import { HttpHelper } from './http-helper.js';
import { ClientError } from './error.js';
import { Message } from './message.js';
import { Duplex } from 'node:stream';
import { EOL } from 'node:os';

let server: http.Server;

const startServer = (port: number) => {
  server = new http.Server();

  server.on('request', (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void => {
    const { method } = req;

    try {
      switch (method) {
        case 'GET':
          getRouter(req, res);
          break;
        case 'POST':
          postRouter(req, res);
          break;
        case 'PUT':
          putRouter(req, res);
          break;
        case 'DELETE':
          deleteRouter(req, res);
          break;
        default:
          HttpHelper.writePageNotFound(res);
          break;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      console.log(message);
      const statusCode = res.statusCode || error instanceof ClientError ? 400 : 500;
      HttpHelper.writeTextResponse(res, statusCode, message);
    }
  });

  server.on('close', () => {
    console.log(`Server on ${port} closed`);
    server.closeAllConnections();
    server.closeIdleConnections();
  });

  server.on('clientError', (error, socket: Duplex): void => {
    socket.end(`HTTP/1.1 400 Bad Request${EOL}${EOL}${error instanceof Error ? error.message + EOL : ''}`);
  });

  server.listen(port, (): void => console.log(`${Message.ServerStarted} ${port}`));

  process.on('SIGTERM', () => {
    server.close();
  });
  process.on('SIGINT', () => {
    server.close();
  });
};

const closeServer = () => {
  server.close();
};

export { startServer, closeServer };
