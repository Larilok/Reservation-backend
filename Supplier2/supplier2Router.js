'use strict';

let s2API = require('./supplier2API.js');

let route = (uri, callback) => {
  if(uri === '/price-list'){
    s2API.getPriceList((result) => {
      // console.log('Done');
      // res.write(JSON.stringify('Unreturned Items:\n'));
      callback(result);
    }); 
  };

  if(uri.match(/\/details\/\d+/)){
    const id = +uri.match(/\d+/)[0];
    s2API.getDetails(id, (result) => {
      callback(result);
    });
  };

  if(uri === '/full'){
    s2API.getPriceList((result) => {
      callback(result);
    }); 
  };
}

module.exports = {route};
