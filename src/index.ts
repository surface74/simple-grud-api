import http, { IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';
import { getRouter, postRouter, putRouter, deleteRouter, pageNotFound } from './router.js';
import { HttpContent } from './http-content.types.js';
import { ClientError } from './error.js';

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
        pageNotFound(res);
        break;
    }
  } catch (error) {
    const statusCode = res.statusCode || error instanceof ClientError ? 400 : 500;
    res.writeHead(statusCode, HttpContent.TEXT);
    const message = error instanceof Error ? error.message : '';
    console.log(message);
    res.write(message);
    res.end();
  }
});

server.listen(port, (): void => console.log(`server started on port ${port}`));
