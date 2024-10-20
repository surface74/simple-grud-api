import http, { IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';
import { getRouter, postRouter, putRouter, deleteRouter } from './router.js';
import { HttpHelper } from './http-helper.js';
import { ClientError } from './error.js';
import { Message } from './message.js';
import { Duplex } from 'node:stream';

const app = () => {
  dotenv.config();
  const port = process.env.PORT ?? 8080;

  const server = new http.Server();

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

  server.on('close', (): never => {
    console.log(`Server on ${port} closed`);
    server.closeAllConnections();
    server.closeIdleConnections();
    process.exit(0);
  });

  server.on('clientError', (error, socket: Duplex): void => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  });

  server.listen(port, (): void => console.log(`${Message.ServerStarted} ${port}`));

  process.on('SIGTERM', () => {
    server.close();
  });
  process.on('SIGINT', () => {
    server.close();
  });
};

export default app;
