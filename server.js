'use strict';

const http = require("http");
const url = require("url");

const port = process.argv[2] || 4242;

http.createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
    // console.log("uri", uri);
    // console.log(req,res);
    if(req.method === 'POST') {
      if(uri === '/getInventory'){
        
      };
      if(uri === '/getPriceById'){
        
      };
      if(uri === '/unretItems'){
        
      };
      return;
    };
}).listen(parseInt(port, 10));

console.log(__dirname);
console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");