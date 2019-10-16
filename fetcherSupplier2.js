'use strict';

let db = require('./db/db.js');

const supplier2Pool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'supply2',
  user: 'supplier2',
  password: 'password'
};

// let base = new db(supplier2Pool);

let fetchPriceList = (callback) => {
  let raw = base.getTable('price_list', callback);
  return raw;
}

let fetchDetails = (id, callback) => {
  let raw = base.getTableByValue('details', 'PriceListId', id, callback);
  return raw;
}
