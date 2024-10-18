import http, { IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';
import { getRouter, postRouter, putRouter, deleteRouter } from './router.js';

dotenv.config();
const port = process.env.PORT ?? 8080;

const server = new http.Server();

server.on('request', (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void => {
  const { method } = req;
  // res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

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
      break;
  }
  res.end();
});

server.listen(port, (): void => console.log(`server started on port ${port}`));
