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

let base = new db(serverPool);

let route = (uri, callback) => {
      if(uri === '/getInventory'){
        base.getTable('inventory', (result) => {
          callback(result);
        });
      };
      if(uri.match(/\/getPriceById:\d+/)){
        const id = +uri.match(/\d+/)[0];
        if (PriceListIdCheck.isSatisfiedBy(id)) {
          base.getTableByValue('inventory', 'Id', id, (result) => {
          callback(result);
          });
        } else {
          callback("Wrong Id provided");
        }
      };
      if(uri === '/unretItems'){
        let date = new Date();
        let now = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
        base.getTableByValue('accounting', 'EndTime', ">" + now, (result) => {
          // res.write(JSON.stringify('Unreturned Items:\n'));
          callback(result);
        });
      };
      if(uri === '/price-list'){
        fs2.fetchPriceList((result) => {
          // res.write(JSON.stringify('Unreturned Items:\n'));
          callback(result);
        }); 
      };
      if(uri.match(/\/details\/\d+/)){
        const id = +uri.match(/\d+/)[0];
        fs2.getTableByValue('details', 'PriceListId', id, (result) => {
          callback(result);
        });
      };      
}

module.exports = {route};
