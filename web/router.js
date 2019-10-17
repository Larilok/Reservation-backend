'use strict';

let db = require('../db/db.js');
let PriceListIdCheck = require('../Specification/PriceListIdCheck.js');
let fs1 = require('../fetcherSupplier1.js');
let fs2 = require('../fetcherSupplier2.js');
// let fs1 = require('../fetcherSupplier1');
let fsM = require('../fetcherMain.js');


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
        let baseDB = new Promise((resolve, reject) => {
          fsM.fetchInventory((result) => {
            resolve(result);
          });
        });
        let supplier1 = new Promise((resolve, reject) => {
          fs1.fetchInventory((result) => {
            resolve(result);
          });
        });
        let supplier2 = new Promise((resolve, reject) => {
          fs2.fetchInventory((result) => {
            resolve(result);
          });
        });
        Promise.all([baseDB, supplier1, supplier2]).then((values) => {
          callback(values[0].concat(values[1]).concat(values[2]));
        });
      };

      if(uri.match(/\/getPriceById:\d+/)){
        const id = +uri.match(/\d+/)[0];
        if (PriceListIdCheck.isSatisfiedBy(id)) {
          let baseDB = new Promise((resolve, reject) => {
            fsM.fetchQueryById(id, (result) => {
            // base.getTableByValue('inventory', 'Id', id, (result) => {
              resolve(result);
            });
          });
          let supplier1 = new Promise((resolve, reject) => {
            fs1.fetchQueryById(id, (result) => {
              resolve(result);
            });
          });
          let supplier2 = new Promise((resolve, reject) => {
            fs2.search("Id", id, (result) => {
              resolve(result);
            });
          });
          Promise.all([baseDB, supplier1, supplier2]).then((values) => {
            callback(values[0].concat(values[1]).concat(values[2]));
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
          // console.log('Done');
          // res.write(JSON.stringify('Unreturned Items:\n'));
          callback(result);
        }); 
      };

      if(uri.match(/\/details\/\d+/)){
        const id = +uri.match(/\d+/)[0];
        fs2.fetchDetails(id, (result) => {
          callback(result);
        });
      };  

      if(uri.match(/\/search\?query='.+'/)){
        let query = uri.match(/\'.+\'/)[0];
        const search = query.slice(1, -1).split('=');
        if(search[0] === 'category'){
          const categoryName = search[1];
          fs1.fetchQueryByCategory(categoryName, (result) => {
            callback(result);
          });
        }
        if(search[0] === 'feature'){
          const featureName = search[1];
          fs1.fetchQueryByCategory(featureName, (result) => {
            callback(result);
          });
        }
      };      
}

module.exports = {route};
