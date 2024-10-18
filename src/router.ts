import { IncomingMessage, ServerResponse } from 'node:http';

function getRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  res.write('process GET request...');
}

function postRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  res.write('process POST request...');
}
function putRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  res.write('process PUT request...');
}
function deleteRouter(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
  res.write('process DELETE request...');
}

export { getRouter, postRouter, putRouter, deleteRouter };
