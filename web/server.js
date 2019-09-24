'use strict';

const http = require("http");
const url = require("url");

let db = require('../db/db.js');
let PriceListIdCheck = require('../Specification/PriceListIdCheck.js')

const port = process.argv[2] || 4242;

let base = new db();

http.createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
    // console.log(uri);
    // console.log("uri", uri);
    // console.log(req,res);
    if(req.method === 'GET') {
      if(uri === '/getInventory'){
        base.getTable('inventory', (result) => {
          // res.write(JSON.stringify('Inventory contents:\n'));
          res.write(JSON.stringify(result));
          res.end();
        });
      };
      if(uri.match(/\/getPriceById:\d+/)){
        const id = +uri.match(/\d+/)[0];
        if (PriceListIdCheck.isSatisfiedBy(id)) {
          base.getTableByValue('price_list', 'InventoryID', id, (result) => {
          // res.write(JSON.stringify(`Price for id ${id}:\n`));
          res.write(JSON.stringify(result));
          res.end();
          });
        } else {
          res.write(JSON.stringify("Wrong id provided"));
          res.end();
        }
      };
      if(uri === '/unretItems'){
        let date = new Date();
        let now = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
        base.getTableByValue('accounting', 'EndTime', ">" + now, (result) => {
          // res.write(JSON.stringify('Unreturned Items:\n'));
          res.write(JSON.stringify(result));
          res.end();
        });
      };
      return;
    };
}).listen(parseInt(port, 10));

console.log(__dirname);
console.log("Server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");

// base.close();
