'use strict';

const http = require("http");
const url = require("url");


let router = require('./router.js');

const port = process.argv[2] || 4242;


http.createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
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
