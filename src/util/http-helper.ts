import { IncomingMessage, ServerResponse } from 'node:http';
import { Message } from '../types/message.types.js';

export const HttpHelper = {
  TEXT: { 'Content-Type': 'text/html; charset=utf-8' },
  JSON: { 'Content-Type': 'application/json' },

  writeTextResponse(res: ServerResponse<IncomingMessage>, statusCode: number, text: string): void {
    res.writeHead(statusCode, this.TEXT);
    res.write(text);
    res.end();
  },

  writeJSONResponse(res: ServerResponse<IncomingMessage>, statusCode: number, text: string): void {
    res.writeHead(statusCode, this.JSON);
    res.write(text);
    res.end();
  },

  writePageNotFound(res: ServerResponse<IncomingMessage>): void {
    this.writeTextResponse(res, 404, Message.PageNotFound);
  },
};
