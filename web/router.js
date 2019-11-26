'use strict';

let db = require('../db/db.js');
let PriceListIdCheck = require('../Specification/PriceListIdCheck.js');
let fs1 = require('../fetchers/fetcherSupplier1.js');
let fs2 = require('../fetchers/fetcherSupplier2.js');
let fsM = require('../fetchers/fetcherMain.js');
const cache = require('../caching/cacheO.js');


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
    cache.makeCache(() => callback("Successful caching"));
  }
  if(uri === '/dropCache' && remoteAddress === '::ffff:127.0.0.1') {
    cache.dropCache(() => callback("Successful cache cleaning"));
  }
  if(uri === '/expireCacheEntries' && remoteAddress === '::ffff:127.0.0.1') {
    cache.expireCacheEntries(() => callback("Successfully expired cache entries"));
  }

  if(uri === '/getInventory'){
    let baseDB = new Promise((resolve, reject) => {
      if(cache.cache.mainInv.length > 0) {
        console.log('Using cache for Main');
        resolve(cache.cache.mainInv);
      } else {
        console.log('Fetching Main - NO cache');
        fsM.fetchInventory((result) => {
          resolve(result);
        });
      }
    });
    let supplier1 = new Promise((resolve, reject) => {
      if(cache.cache.s1Inv.length > 0) {
        console.log('Using cache for S1');
        resolve(cache.cache.s1Inv);
      } else {
        console.log('Fetching S1 - NO cache');
        fs1.fetchInventory((result) => {
          resolve(result);
        });
      }
    });
    let supplier2 = new Promise((resolve, reject) => {
      if(cache.cache.s2Inv.length > 0) {
        console.log('Using cache for S2');
        resolve(cache.cache.s2Inv);
      } else {
        console.log('Fetching S2 - NO cache');
        fs2.fetchInventory((result) => {
          resolve(result);
        });
      }
    });
    Promise.all([baseDB, supplier1, supplier2]).then((values) => {
      callback(values[0].concat(values[1]).concat(values[2]));
    });
  };

  if(uri.match(/\/getPriceById:\d+/)){
    const id = +uri.match(/\d+/)[0];
    if (PriceListIdCheck.isSatisfiedBy(id)) {
      let baseDB = new Promise((resolve, reject) => {///////////////////////////////////////
        if(cache.cache.mainInv.length > 0) {
          console.log('Using cache for Main');
          cache.getQueryById(0, id, (result) => {
            resolve(result);
          });
        } else {
          console.log('Fetching Main - NO cache');
          fsM.fetchQueryById(id, (result) => {
            resolve(result);
          });
        }
      });//end of baseDB Promise
      let supplier1 = new Promise((resolve, reject) => {
        if(cache.cache.s1Inv.length > 0) {
          console.log('Using cache for S1');
          cache.getQueryById(1, id, (result) => {
            resolve(result);
          });
        } else {
          console.log('Fetching S1 - NO cache');
          fsM.fetchQueryById(id, (result) => {
            resolve(result);
          });
        }
      });//end of supplier1 Promise
      let supplier2 = new Promise((resolve, reject) => {
        if(cache.cache.s2Inv.length > 0) {
          console.log('Using cache for S2');
          cache.getQueryById(2, id, (result) => {
            resolve(result);
          });
        } else {
          console.log('Fetching S2 - NO cache');
          fs2.fetchFiltered("Id", id, (result) => {
            resolve(result);
          });
        }
      });//end of supplier2 Promise
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
    if(cache.cache.s2Inv.length > 0) {
      console.log('Using cache for Price List');
      cache.getPriceList((result) => {
        callback(result);
      });
    } else {
      console.log('Fetching PriceList - NO cache');
      fs2.fetchPriceList((result) => {
        callback(result);
      }); 
    }
  };

  if(uri.match(/\/details\/\d+/)){
    const id = +uri.match(/\d+/)[0];
    if(cache.cache.s2Inv.length > 0) {
      console.log('Using cache for Details');
      cache.getDetails(id, (result) => {
        callback(result);
      });
    } else {
      console.log('Fetching Details - NO cache');
      fs2.fetchDetails(id, (result) => {
        callback(result);
      });
    }
  };  

  if(uri.match(/\/search\?query='.+'/)){
    let query = uri.match(/\'.+\'/)[0];
    const search = query.slice(1, -1).split('=');
    
    if(search[0] === 'category'){
      const categoryName = search[1];
      if(cache.cache.s1Inv.length > 0) {
        console.log('Using cache for Category Search');
        cache.getQueryByCategory(categoryName, (result) => {
          callback(result);
        });
      } else {
        console.log('Fetching Category Search - NO cache');
        fs1.fetchQueryByCategory(categoryName, (result) => {
          callback(result);
        });
      }
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
