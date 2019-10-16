'use strict';

let db = require('../db/db.js');
let PriceListIdCheck = require('../Specification/PriceListIdCheck.js');
let fs2 = require('../fetcherSupplier2.js');

const serverPool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'architecture',
  user: 'postgres',
  password: 'password'
};

let route = (uri, callback) => {
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
          base.getTableByValue('inventory', 'Id', id, (result) => {
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
      if(uri === '/price-list'){
        fs2.fetchPriceList((result) => {
          // res.write(JSON.stringify('Unreturned Items:\n'));
          res.write(JSON.stringify(result));
          res.end();
        }); 
      };
      if(uri.match(/\/details\/\d+/)){
        const id = +uri.match(/\d+/)[0];
        fs2.getTableByValue('details', 'PriceListId', id, (result) => {
          // res.write(JSON.stringify('Unreturned Items:\n'));
          res.write(JSON.stringify(result));
          res.end();
        });
      };      
      return;
    };
}
