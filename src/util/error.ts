import { Message } from '../types/message.types.js';

export class ServerError extends Error {
  constructor(message?: string) {
    super(Message.ServerError + (message ? `: ${message}` : ''));
    this.name = this.constructor.name;
  }
}

export class ClientError extends Error {
  constructor(message?: string) {
    super(Message.ClientError + (message ? `: ${message}` : ''));
    this.name = this.constructor.name;
  }
}

export class ClientRequestDataError extends Error {
  constructor(message?: string) {
    super(Message.ClientRequestDataError + (message ? `: ${message}` : ''));
    this.name = this.constructor.name;
  }
}

export class NotImplementedError extends Error {
  constructor(message?: string) {
    super(Message.NotImplementedError + (message ? `: ${message}` : ''));
    this.name = this.constructor.name;
  }
}
