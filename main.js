'use strict';

let http = require('http');



const options = {
    // headers: req.headers,
    host: '127.0.0.1',
    port: 4242,
    method: 'GET',
    path: '/getInventory',
    timeout: 4000
};

let data = '';
<<<<<<< HEAD
let request = http.request(options, (response) => {
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
      data += chunk;
  });

  response.on('close', () => {
      // console.log(data);
      // return data;
      console.table(JSON.parse(data));
  })
});
=======
// let request = http.request(options, (response) => {
//   response.setEncoding('utf8');
//   response.on('data', (chunk) => {
//       data += chunk;
//   });

//   response.on('close', () => {
//       // console.log(data);
//       // return data;
//       console.log(data);
//   })
// });
>>>>>>> h

request.on('error', e => {
  console.log('REQUEST ERROR:');
  console.log('\x1b[33mWARNING:\x1b[0m: ');
  console.log('\x1b[33mWARNING:\x1b[0m: ', e);
  // exit(e);
});

request.end();
