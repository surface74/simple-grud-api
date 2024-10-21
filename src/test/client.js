import http from 'node:http';

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

const req = http.request(options, (res) => {
  // const { statusCode } = res;
  // console.log(`STATUS: ${res.statusCode}`);
  // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write('');
req.end();

// const req = http.request(options, (res) => handleResponse);

// const handleResponse = (res) => {
//   const { statusCode } = res;
//   const contentType = res.headers['content-type'];

//   console.log('statusCode: ', statusCode);
// if(statusCode != 200) {

// }

// };
