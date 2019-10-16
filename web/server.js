'use strict';

const http = require("http");
const url = require("url");


let router = require('router.js');

const port = process.argv[2] || 4242;


let base = new db(serverPool);

http.createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
    // console.log(uri);
    // console.log("uri", uri);
    // console.log(req,res);
    //pass uri to routes.js, which calls required fetcher
    router.route(uri, (result) => {
      res.write(JSON.stringify(result));
      res.end();
    });

}).listen(parseInt(port, 10));

console.log(__dirname);
console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

// 
