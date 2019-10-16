'use strict';

let db = require('./db/db.js');
let DBResponseBuilder = require('./Builders/DBResponseBuilder.js');

const supplier2Pool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'supply2',
  user: 'supplier2',
  password: 'password'
};

let base = new db(supplier2Pool);

let fetchPriceList = (callback) => {;
  return base.query(`select "Id", "Name", "Price" from "price_list"`, (res) => {
    let response = res.map(obj => {
    return obj = new DBResponseBuilder().setId(obj.Id).setName(obj.Name).setDescription(null).setUnitPrice(obj.Price).setAmInStock(null).build();
    });
    return callback(response);
  });
}

let fetchDetails = (id, callback) => {
  return base.query(`select "Id", "Name", "Description" from "details" join "price_list" on details."PriceListId" = price_list."Id" where "Id" = ${id}`, (res) => {
    let response = res.map(obj => {
    return obj = new DBResponseBuilder().setId(obj.Id).setName(obj.Name).setDescription(obj.Description).setUnitPrice(null).setAmInStock(null).build();
    });
    return callback(response);
  });
}

let search = (column, value, callback) => {
  return base.query(`select * from "details" join "price_list" on details."PriceListId" = price_list."Id" join stock on price_list."Id" = stock."PriceListId"`, (res) => {
    let response = res.filter(obj => {
      if(column === "UnitPrice") {
        return obj.Price === value;
      } else if (column === "Id") {
        return obj.Id === value;
      } else if (column === "AmInStock") {
        return obj.AmountInStock === value
      };
    });
    response = response.map(obj => {
      return obj = new DBResponseBuilder().setId(obj.Id).setName(obj.Name).setDescription(obj.Description).setUnitPrice(obj.Price).setAmInStock(obj.AmountInStock).build();
    });
    return callback(response);
  });
}

module.exports = {fetchPriceList, fetchDetails, search};
