'use strict';

let db = require('../db/db.js');

const supplier2Pool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'supply2',
  user: 'supplier2',
  password: 'password'
};

let base = new db(supplier2Pool);

let getPriceList = (callback) => {;
  return base.query(`select "Id", "Name", "Price" from "price_list"`, (res) => {
    return callback(res);
  });
}

let getDetails = (id, callback) => {
  return base.query(`select "Id", "Name", "Description" from "details" join "price_list" on details."PriceListId" = price_list."Id" where "Id" = ${id}`, (res) => {
    return callback(res);
  });
}

let getFull = (callback) => {
  return base.query(`select * from "details" join "price_list" on details."PriceListId" = price_list."Id" join stock on price_list."Id" = stock."PriceListId"`, (res) => {
  return callback(res);
  });
}

let getFullPage = (page, callback) => {
  return base.query(`select * from "details" join "price_list" on details."PriceListId" = price_list."Id" join stock on price_list."Id" = stock."PriceListId"
    limit 5001 offset ${5000*(page-1)}`, (res) => {
  return callback(res);
  });
}

module.exports = {
  getPriceList,
  getDetails,
  getFull,
  getFullPage
}
