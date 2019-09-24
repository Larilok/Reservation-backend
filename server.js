'use strict';

const http = require("http");
const url = require("url");

let db = require('./db.js');

const port = process.argv[2] || 4242;

let base = new db();

http.createServer((req, res) => {
    console.log(req.url);
    const uri = url.parse(req.url).pathname;
    // console.log("uri", uri);
    // console.log(req,res);
    if(req.method === 'GET') {
      if(uri === '/getInventory'){
        res.write("Hello");
        res.end();
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

// base.close();
