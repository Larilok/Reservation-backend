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
<<<<<<< HEAD
        // let a = new Promise((res, rej) => {
        //   resolve(await base.getTable('inventory'));
        // }).then(console.log(a));
        // let pro = new Promise((res, rej) => {

        // });
        let a = base.getTable('inventory', (result) => {
          console.log(result);
          res.write(JSON.stringify(result));
          res.end();
        });
        // console.log(a);
        // a.then(console.log(a));
        // res.write("a");
        
=======
        console.log(base.getTable("inventory"));
        res.write();
        res.end();
>>>>>>> h
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
