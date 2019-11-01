'use strict';

const http = require('http');

const DBResponseBuilder = require('../Builders/DBResponseBuilder.js');
// const s2 = require('../Supplier2/supplier2API.js');
const req = require('../requestMaker.js');


let fetchPriceList = (callback) => {
  return req.makeRequest(4244, '/price-list', (res) => {
    let response = res.map(obj => {
      return obj = new 
        DBResponseBuilder()
        .setId(obj.Id)
        .setName(obj.Name)
        .setDescription(null)
        .setUnitPrice(obj.Price)
        .setAmInStock(null)
        .build();
    });
    return callback(response);
  })
}

let fetchDetails = (id, callback) => {
  return req.makeRequest(4244, '/details/' + id, (res) => {
    let response = res.map(obj => {
    return obj = new 
      DBResponseBuilder()
        .setId(obj.Id)
        .setName(obj.Name)
        .setDescription(obj.Description)
        .setUnitPrice(null)
        .setAmInStock(null)
        .build();
    });
    return callback(response);
  })
}

let fetchFiltered = (column, value, callback) => {
  return req.makeRequest(4244, '/full', (res) => {
    let response;
    if(column === "UnitPrice") {
      response = res.filter(obj => {return obj.Price === value});
    } else if (column === "Id") {
      response = res.filter(obj => {return obj.Id === value});
    } else if (column === "AmInStock") {
      response = res.filter(obj => {return obj.AmountInStock === value});
    };
    response = response.map(obj => {
      return obj = new 
        DBResponseBuilder()
        .setId(obj.Id)
        .setName(obj.Name)
        .setDescription(obj.Description)
        .setUnitPrice(obj.Price)
        .setAmInStock(obj.AmountInStock)
        .build();
    });
    return callback(response);
  })
}

let fetchInventory = (callback) => {
  return req.makeRequest(4244, '/full', (res) => {
    let response = res.map(obj => {
    return obj = new DBResponseBuilder().setId(obj.Id).setName(obj.Name).setDescription(obj.Description).setUnitPrice(obj.Price).setAmInStock(obj.AmountInStock).build();
    });
    return callback(response);
  })
}

// fetchPriceList((res) => console.table(res));
module.exports = {fetchPriceList, fetchDetails, fetchFiltered, fetchInventory};
