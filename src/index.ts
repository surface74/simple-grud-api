import http, { IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';
import { getRouter, postRouter, putRouter, deleteRouter, pageNotFound } from './router.js';
import { HttpContent } from './http-content.types.js';
import { ClientError, ServerError } from './error.js';

dotenv.config();
const port = process.env.PORT ?? 8080;

const server = new http.Server();

server.on('request', (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void => {
  const { method } = req;
  // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
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
    if (error instanceof ServerError) {
      res.writeHead(500, HttpContent.TEXT);
    } else if (error instanceof ClientError) {
      res.writeHead(400, HttpContent.TEXT);
    }

    const message = error instanceof Error ? error.message : '';
    console.log(message);
    res.write(message);
    res.end();
  }
});

server.listen(port, (): void => console.log(`server started on port ${port}`));
