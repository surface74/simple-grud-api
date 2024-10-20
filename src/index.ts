import http, { IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';
import { getRouter, postRouter, putRouter, deleteRouter } from './router.js';
import { HttpHelper } from './http-helper.js';
import { ClientError } from './error.js';
import { Message } from './message.js';

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

server.listen(port, (): void => console.log(`${Message.ServerStarted} ${port}`));
