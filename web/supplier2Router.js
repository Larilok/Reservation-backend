'use strict';

let s2Api = require('../Supplier2/supplier1API.js');

let route(uri, callback) => {
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
}
