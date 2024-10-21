import { IncomingMessage, ServerResponse } from 'node:http';

import { validate as isUuidValid } from 'uuid';

import { ApiPath } from './types/api-path.types.js';
import { Message } from './types/message.types.js';
import { ServerError } from './util/error.js';
import User from './types/user.types.js';
import webService from './web-service.js';
import { HttpHelper } from './util/http-helper.js';

function getRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;

  if (url === ApiPath.GetAll) {
    webService
      .getAll()
      .then((users: User[]): void => HttpHelper.writeJSONResponse(res, 200, JSON.stringify(users)))
      .catch((): never => {
        throw new ServerError();
      });
  } else if (url?.startsWith(ApiPath.GetUser)) {
    const uuid = url.slice(ApiPath.GetUser.length);
    if (!isUuidValid(uuid)) {
      HttpHelper.writeTextResponse(res, 400, Message.WrongUUID);
      return;
    }
    const user = webService.getRecord(uuid);
    if (user) {
      HttpHelper.writeJSONResponse(res, 200, JSON.stringify(user));
    } else {
      HttpHelper.writeTextResponse(res, 404, Message.RecordNotExist);
    }
  } else {
    HttpHelper.writePageNotFound(res);
  }
}

function postRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url === ApiPath.CreateUser) {
    processRequestBody(req, res, createUser);
  } else {
    HttpHelper.writePageNotFound(res);
  }
}

function putRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url?.startsWith(ApiPath.UpdateUser)) {
    const uuid = url.slice(ApiPath.UpdateUser.length);
    if (!isUuidValid(uuid)) {
      HttpHelper.writeTextResponse(res, 400, Message.WrongUUID);
      return;
    }
    processRequestBody(req, res, updateUser);
  } else {
    HttpHelper.writePageNotFound(res);
  }
}

function deleteRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  const { url } = req;
  if (url?.startsWith(ApiPath.DeleteUser)) {
    const uuid = url.slice(ApiPath.DeleteUser.length);
    if (!isUuidValid(uuid)) {
      HttpHelper.writeTextResponse(res, 400, Message.WrongUUID);
      return;
    }
    const isDeleted = webService.deleteUser(uuid);
    if (isDeleted) {
      HttpHelper.writeTextResponse(res, 204, Message.OK);
    } else {
      HttpHelper.writeTextResponse(res, 404, Message.RecordNotExist);
    }
  } else {
    HttpHelper.writePageNotFound(res);
  }
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
      HttpHelper.writeTextResponse(res, 400, Message.WrongUUID);
      return;
    }

    const user = webService.createUser({ username, age, hobbies });
    HttpHelper.writeJSONResponse(res, 201, JSON.stringify(user));
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
      HttpHelper.writeTextResponse(res, 400, Message.ClientRequestDataError);
      return;
    }

    const user = webService.updateUser({ id, username, age, hobbies });
    if (user) {
      HttpHelper.writeJSONResponse(res, 200, JSON.stringify(user));
    } else {
      HttpHelper.writeTextResponse(res, 404, Message.RecordNotExist);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    throw new ServerError(message);
  }
}

export { getRouter, postRouter, putRouter, deleteRouter };
