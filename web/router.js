'use strict';

let db = require('../db/db.js');
let PriceListIdCheck = require('../Specification/PriceListIdCheck.js');
let fs1 = require('../fetchers/fetcherSupplier1.js');
let fs2 = require('../fetchers/fetcherSupplier2.js');
let fsM = require('../fetchers/fetcherMain.js');
const cache = require('../caching/cache.js');


const serverPool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'architecture',
  user: 'postgres',
  password: 'password'
};

let base = new db(serverPool);

let route = (remoteAddress, uri, callback) => {
  if(uri === '/cache' && remoteAddress === '::ffff:127.0.0.1') {
    cache.cache(() => callback("Successful caching"));
  }
  if(uri === '/dropCache' && remoteAddress === '::ffff:127.0.0.1') {
    cache.dropCache(() => callback("Successful cache cleaning"));
  }
  if(uri === '/getInventory'){
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(cache.s1Inv);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    let baseDB = new Promise((resolve, reject) => {
      fsM.fetchInventory((result) => {
        resolve(result);
      });
    });
    let supplier1 = new Promise((resolve, reject) => {
      if(cache.s1Inv.length > 0) {
        console.log('Using cache for S1');
        resolve(cache.s1Inv);
      } else {
        console.log('Fetching S1 - NO cache');
        fs1.fetchInventory((result) => {
          resolve(result);
        });
      }
      // fs1.fetchInventory((result) => {
      //   resolve(result);
      // });
    });
    let supplier2 = new Promise((resolve, reject) => {
      if(cache.s2Inv.length > 0) {
        console.log('Using cache for S2');
        resolve(cache.s2Inv);
      } else {
        console.log('Fetching S2 - NO cache');
        fs2.fetchInventory((result) => {
          resolve(result);
        });
      }
      // fs2.fetchInventory((result) => {
      //   resolve(result);
      // });
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
        fs2.fetchFiltered("Id", id, (result) => {
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
      fs1.fetchQueryByFeatureValue(featureName, (result) => {
        callback(result);
      });
    }
  };
}

module.exports = {route};
