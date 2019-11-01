'use strict';

// let db = require('../db/db.js');
let DBResponseBuilder = require('../Builders/DBResponseBuilder.js');
// const s1 = require('../Supplier1/supplier1API.js');
const req = require('../requestMaker.js');


const fetchQueryByFeatureValue = (value, callback) => {
  return req.makeRequest(4243, "/search?query='feature=" + value + "'", (res) => {
    const response = res.map(obj => {
      return obj = new
       DBResponseBuilder()
        .setId(obj.Id)
        .setName(obj.Name)
        .setDescription(obj.Description)
        .setUnitPrice(obj.UnitPrice)
        .setAmInStock(obj.AmInStock)
        .build();
    })
    return callback(response);
  });
}

const fetchQueryByCategory = (value, callback) => {
  return req.makeRequest(4243, "/search?query='category=" + value + "'", (res) => {
    const response = res.map(obj => {
      return obj = new
       DBResponseBuilder()
        .setId(obj.Id)
        .setName(obj.Name)
        .setDescription(obj.Description)
        .setUnitPrice(obj.UnitPrice)
        .setAmInStock(obj.AmInStock)
        .build();
    })
    return callback(response);
  });
}

const fetchQueryById = (value, callback) => {
  return req.makeRequest(4243, "/getPriceById:" + value, (res) => {
    const response = res.map(obj => {
      return obj = new
       DBResponseBuilder()
        .setId(obj.Id)
        .setName(obj.Name)
        .setDescription(obj.Description)
        .setUnitPrice(obj.UnitPrice)
        .setAmInStock(obj.AmInStock)
        .build();
    })
    return callback(response);
  });
}

const fetchInventory = (callback) => {
    return req.makeRequest(4243, "/getInventory", (res) => {
    let response = res.map(obj => {
    return obj = new DBResponseBuilder().setId(obj.Id).setName(obj.Name).setDescription(obj.Description).setUnitPrice(obj.UnitPrice).setAmInStock(obj.AmInStock).build();
    });
    return callback(response);
  });
}

// fetchQueryByFeatureValue('White', (result) => console.table(result));
// fetchQueryByCategory('Tent', (result) => console.table(result));

module.exports = {fetchQueryByCategory, fetchQueryByFeatureValue, fetchQueryById, fetchInventory};
