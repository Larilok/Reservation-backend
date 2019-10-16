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
  return base.query(`select "Id", "Name", "Price" from "details" join "price_list" on details."PriceListId" = price_list."Id"`, (res) => {
    let response = res.map(obj => {
    return obj = new DBResponseBuilder().setId(obj.Id).setName(obj.Name).setDescription(null).setPrice(obj.Price).setAmInStock(null).build();
    });
    return callback(response);
  });
}

let fetchDetails = (id, callback) => {
  return base.query(`select "Id", "Name", "Description" from "details" join "price_list" on details."PriceListId" = price_list."Id" where "Id" = ${id}`, (res) => {
    let response = res.map(obj => {
    return obj = new DBResponseBuilder().setId(obj.Id).setName(obj.Name).setDescription(obj.Description).setPrice(null).setAmInStock(null).build();
    });
    return callback(response);
  });
}

//

fetchDetails(3, (res) => console.table(res));

module.exports = {fetchPriceList, fetchDetails};
