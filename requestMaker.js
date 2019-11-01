'use strict';

let http = require('http');

let options = {
    // headers: req.headers,
    host: '127.0.0.1',
    port: null,
    method: 'GET',
    path: null,
    timeout: 4000
};

let makeRequest = (port, path, callback) => {
  let data = '';

  options.port = port;
  options.path = path;
  let request = http.request(options, (response) => {
    // console.log(options);
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('close', () => {
      // console.table(JSON.parse(data));
      return callback(JSON.parse(data));
    })
  });

  request.on('error', e => {
    console.log('REQUEST ERROR:');
    console.log('\x1b[33mWARNING:\x1b[0m: ');
    console.log('\x1b[33mWARNING:\x1b[0m: ', e);
    // exit(e);
  });
  request.end();
}

// makeRequest({port:4242, path: ''})

module.exports = {
  makeRequest
}
