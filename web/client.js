'use strict';

let http = require('http');

const options = {
    // headers: req.headers,
    host: '127.0.0.1',
    port: 4242,
    method: 'GET',
    path: '/search?query=\'category=Tent\'',
    timeout: 4000
};

let options2 = Object.assign({}, options);
options2.path = '/getPriceById:1';

let options3 = Object.assign({}, options);
options3.path = '/unretItems';

let options4 = Object.assign({}, options);
options4.path = '/price-list';

let data = ['', '', '', ''];
let request = http.request(options, (response) => {
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
      data[0] += chunk;
  });

  response.on('close', () => {
      console.table(JSON.parse(data[0]));
  })
});

request.on('error', e => {
  console.log('REQUEST ERROR:');
  console.log('\x1b[33mWARNING:\x1b[0m: ');
  console.log('\x1b[33mWARNING:\x1b[0m: ', e);
  // exit(e);
});

request.end();

let request2 = http.request(options2, (response) => {
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
      data[1] += chunk;
  });

  response.on('close', () => {
      console.table(JSON.parse(data[1]));
  })
});

request2.on('error', e => {
  console.log('REQUEST2 ERROR:');
  console.log('\x1b[33mWARNING:\x1b[0m: ');
  console.log('\x1b[33mWARNING:\x1b[0m: ', e);
  // exit(e);
});

request2.end();


let request3 = http.request(options3, (response) => {
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
      data[2] += chunk;
  });

  response.on('close', () => {
      console.table(JSON.parse(data[2]));
  })
});

request3.on('error', e => {
  console.log('REQUEST3 ERROR:');
  console.log('\x1b[33mWARNING:\x1b[0m: ');
  console.log('\x1b[33mWARNING:\x1b[0m: ', e);
  // exit(e);
});

request3.end();

let request4 = http.request(options4, (response) => {
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
      data[3] += chunk;
  });

  response.on('close', () => {
      console.table(JSON.parse(data[3]));
  })
});

request4.on('error', e => {
  console.log('REQUEST4 ERROR:');
  console.log('\x1b[33mWARNING:\x1b[0m: ');
  console.log('\x1b[33mWARNING:\x1b[0m: ', e);
  // exit(e);
});

request4.end();
