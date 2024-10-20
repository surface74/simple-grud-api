import { IncomingMessage, ServerResponse } from 'node:http';

import { validate as isUuidValid } from 'uuid';

import { ApiPath } from './api-path.js';
import { Message } from './message.js';
import DataService from './web-service.js';
import { ServerError } from './error.js';
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
      res.write(Message.RecordNotExist);
      res.end();
    }
  } else pageNotFound(res);
}

function postRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url === ApiPath.CreateUser) {
    processRequestBody(req, res, createUser);
  } else {
    pageNotFound(res);
  }
}

function putRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url?.startsWith(ApiPath.UpdateUser)) {
    const uuid = url.slice(ApiPath.UpdateUser.length);
    if (!isUuidValid(uuid)) {
      res.writeHead(400, HttpContent.TEXT);
      res.write(Message.ClientRequestDataError + ': ' + Message.WrongUUID);
      res.end();
      return;
    }
    processRequestBody(req, res, updateUser);
  } else {
    pageNotFound(res);
  }
}

function deleteRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url?.startsWith(ApiPath.DeleteUser)) {
    const uuid = url.slice(ApiPath.DeleteUser.length);
    if (!isUuidValid(uuid)) {
      res.writeHead(400, HttpContent.TEXT);
      res.write(Message.ClientRequestDataError + ': ' + Message.WrongUUID);
      res.end();
      return;
    }
    const isDeleted = webService.deleteUser(uuid);
    if (isDeleted) {
      res.writeHead(204, HttpContent.TEXT);
      res.write(Message.OK);
      res.end();
    } else {
      res.writeHead(404, HttpContent.TEXT);
      res.write(Message.RecordNotExist);
      res.end();
    }
  } else {
    pageNotFound(res);
  }
}

function pageNotFound(res: ServerResponse<IncomingMessage>): void {
  res.writeHead(404, HttpContent.TEXT);
  res.write(Message.PageNotFound);
  res.end();
}

function processRequestBody(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  callback: (req: IncomingMessage, res: ServerResponse<IncomingMessage>, body: string) => void
): void {
  let body = '';
  req.on('data', (chunk: Buffer): string => (body += chunk.toString()));
  req.on('end', (): void => callback(req, res, body));
  req.on('error', (error: Error): void => {
    throw new ServerError(error.message);
  });
}

function createUser(_: IncomingMessage, res: ServerResponse<IncomingMessage>, body: string): void {
  try {
    const { username, age, hobbies } = JSON.parse(body) as User;
    if (!username || !age || !hobbies) {
      res.writeHead(400, HttpContent.TEXT);
      res.write(Message.ClientRequestDataError + ': ' + Message.WrongUUID);
      res.end();
      return;
    }

    const user = webService.createUser({ username, age, hobbies });
    res.writeHead(201, HttpContent.JSON);
    res.write(JSON.stringify(user));
    res.end();
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    throw new ServerError(message);
  }
}

function updateUser(req: IncomingMessage, res: ServerResponse<IncomingMessage>, body: string): void {
  try {
    const id = req.url?.slice(ApiPath.UpdateUser.length);
    const { username, age, hobbies } = JSON.parse(body) as User;
    if (!username || !age || !hobbies) {
      res.writeHead(400, HttpContent.TEXT);
      res.write(Message.ClientRequestDataError);
      res.end();
      return;
    }

    const user = webService.updateUser({ id, username, age, hobbies });
    if (user) {
      res.writeHead(200, HttpContent.JSON);
      res.write(JSON.stringify(user));
      res.end();
    } else {
      res.writeHead(404, HttpContent.TEXT);
      res.write(Message.RecordNotExist);
      res.end();
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    throw new ServerError(message);
  }
}

export { getRouter, postRouter, putRouter, deleteRouter, pageNotFound };
