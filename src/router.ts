import { IncomingMessage, ServerResponse } from 'node:http';
// import { v4 as getUUID } from 'uuid';
import { ApiPath } from './api-path.js';
import { Message } from './message.js';

function getRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;

  if (url === ApiPath.GetAll) {
    res.write('get all record');
  } else if (url?.startsWith(ApiPath.GetUser)) {
    res.write(`get record for id=${url.slice(ApiPath.GetUser.length)}`);
  } else pageNotFound(res);
}

function postRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url === ApiPath.CreateUser) {
    res.write('create user');
    let body = '';
    req.on('data', (chunk: Buffer) => (body += chunk.toString()));
    req.on('end', () => console.log(JSON.parse(body)));
  } else pageNotFound(res);
}

function putRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url === ApiPath.UpdateUser) {
    res.write('update user');
  } else pageNotFound(res);
}

function deleteRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url === ApiPath.DeleteUser) {
    res.write('delete user');
  } else pageNotFound(res);
}

function pageNotFound(res: ServerResponse<IncomingMessage>): void {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write(Message.PageNotFound);
}

export { getRouter, postRouter, putRouter, deleteRouter, pageNotFound };
