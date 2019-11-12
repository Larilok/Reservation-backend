'use strict';

const http = require("http");
const url = require("url");
const cache = require("../caching/cache.js");


let router = require('./router.js');

const port = process.argv[2] || 4242;


http.createServer((req, res) => {
  console.log(req.socket.remoteAddress);
  console.log(req.socket.remotePort);
  console.log(req.socket.remoteFamily);
  console.log('``````````````````````````````````````````````````````````````````````````````````````````````````````````````');
  // console.log(res);
  const uri = url.parse(req.url).path;
  console.log(uri);
  if(uri === '/cache' && req.socket.remoteAddress === '::ffff:127.0.0.1') {
    cache.cache(() => {
      res.write("Successful caching");
      res.end();
    });
    console.log('Here');
    return;
  }
  if(req.method === 'GET') {
    router.route(uri, (result) => {
      res.write(JSON.stringify(result));
      res.end();
    });
    return;
  };
}).listen(parseInt(port, 10));

console.log(__dirname);
console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

// 
