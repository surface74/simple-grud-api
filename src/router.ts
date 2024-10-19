import { IncomingMessage, ServerResponse } from 'node:http';

import { validate as isUuidValid } from 'uuid';

import { ApiPath } from './api-path.js';
import { Message } from './message.js';
import DataService from './web-service.js';
import { ServerError, ClientRequestDataError } from './error.js';
import User from './user-types.js';
import webService from './web-service.js';
import { HttpContent } from './http-content.types.js';

function getRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;

  if (url === ApiPath.GetAll) {
    const users = DataService.getAll();
    res.writeHead(200, HttpContent.JSON);
    res.write(JSON.stringify(users));
    res.end();
  } else if (url?.startsWith(ApiPath.GetUser)) {
    const uuid = url.slice(ApiPath.GetUser.length);
    if (!isUuidValid(uuid)) {
      res.writeHead(400, HttpContent.TEXT);
      res.write(Message.ClientRequestDataError + ': ' + Message.WrongUUID);
      res.end();
      return;
    }
    const user = DataService.getRecord(uuid);
    if (user) {
      res.writeHead(200, HttpContent.JSON);
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.writeHead(404, HttpContent.TEXT);
      res.write(Message.ClientRequestDataError + ': ' + Message.RecordNotExist);
      res.end();
    }
  } else pageNotFound(res);
}

function postRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url === ApiPath.CreateUser) {
    let body = '';
    req.on('data', (chunk: Buffer): string => (body += chunk.toString()));
    req.on('end', (): void => {
      const newUser = createUser(body);

      res.writeHead(201, HttpContent.JSON);
      res.write(JSON.stringify(newUser), 'utf-8');
      res.end();
    });
    req.on('error', (): void => {
      throw new ServerError();
    });
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
  res.writeHead(404, HttpContent.TEXT);
  res.write(Message.PageNotFound);
  res.end();
}

function createUser(body: string): User {
  try {
    const { username, age, hobbies } = JSON.parse(body) as User;
    if (!username || !age || !hobbies) {
      throw new ClientRequestDataError();
    }

    return webService.createUser({ username, age, hobbies });
  } catch {
    throw new ClientRequestDataError();
  }
}

export { getRouter, postRouter, putRouter, deleteRouter, pageNotFound };
