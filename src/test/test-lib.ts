import http, { IncomingMessage } from 'node:http';

export const CheckResponse = (port: number): Promise<string> => {
  const options = {
    hostname: 'localhost',
    port: port,
    path: '/api/users',
    angent: false,
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res: IncomingMessage): void => {
      const { statusCode } = res;
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk: Buffer): string => (body += chunk.toString()));
      res.on('end', () => resolve(statusCode?.toString() || '400'));
    });

    req.on('error', (e: Error): void => reject(e));

    req.write('');
    req.end();
  });
};

export const GetAll = (port: number): Promise<string> => {
  const options = {
    hostname: 'localhost',
    port: port,
    path: '/api/users',
    angent: false,
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res: IncomingMessage): void => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk: Buffer): string => (body += chunk.toString()));
      res.on('end', () => resolve(body));
    });

    req.on('error', (e: Error): void => reject(e));

    req.write('');
    req.end();
  });
};

export const AddUser = (port: number): Promise<string> => {
  const options = {
    hostname: 'localhost',
    port: port,
    path: '/api/users',
    angent: false,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const postData = {
    username: 'Serge',
    age: 20,
    hobbies: ['live', 'fun'],
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res: IncomingMessage): void => {
      const { statusCode } = res;
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk: Buffer): string => (body += chunk.toString()));
      res.on('end', () => resolve(statusCode?.toString() || '400'));
    });

    req.on('error', (e: Error): void => reject(e));

    req.write(JSON.stringify(postData));
    req.end();
  });
};

export const DeleteUser = (port: number, uuid: string | undefined): Promise<string> => {
  const options = {
    hostname: 'localhost',
    port: port,
    path: `/api/users/${uuid}`,
    angent: false,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res: IncomingMessage): void => {
      const { statusCode } = res;
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk: Buffer): string => (body += chunk.toString()));
      res.on('end', () => resolve(statusCode?.toString() || '400'));
    });

    req.on('error', (e: Error): void => reject(e));

    req.write('');
    req.end();
  });
};
