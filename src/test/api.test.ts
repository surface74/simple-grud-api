import http, { IncomingMessage } from 'node:http';
// import dotenv from 'dotenv';
// import { startServer, closeServer } from '../app.js';

// dotenv.config();
// const port = process.env.PORT || '8080';

// startServer(Number.parseInt(port));

// afterAll((): void => closeServer());

describe('Server API', () => {
  test('get all feature', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/users',
      angent: false,
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res: IncomingMessage): void => {
      // const { statusCode } = res;
      // console.log(`STATUS: ${res.statusCode}`);
      // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      // res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk: Buffer): string => (body += chunk.toString()));

      res.on('end', () => {
        expect(body).toBeInstanceOf(Array);
        done();
      });
    });

    req.on('error', (e: Error): void => {
      done(new Error(e.message));
    });

    req.write('');
    req.end();
  });
});

// const startAgent = () => {
//   const httpAgent = new http.Agent();

// }
