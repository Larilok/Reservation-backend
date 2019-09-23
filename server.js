'use strict';

const http = require("http");
const url = require("url");

const port = process.argv[2] || 4242;

http.createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
    // console.log("uri", uri);
    // console.log(req,res);
    if(req.method === 'GET') {
      if(uri === '/getInventory'){

      };
      if(uri.match(/\/getPriceById:\d+/)){
        const id = uri.match(/\d+/)[0];
      };
      if(uri === '/unretItems'){
        
      };
      return;
    };
}).listen(parseInt(port, 10));

console.log(__dirname);
console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");