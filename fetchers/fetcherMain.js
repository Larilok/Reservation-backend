'use strict';

let db = require('../db/db.js');
let DBResponseBuilder = require('../Builders/DBResponseBuilder.js');

const basePool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'architecture',
  user: 'postgres',
  password: 'password'
};

let base = new db(basePool);

const fetchInventory = (callback) => {
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice",\
    s."AmInStock" from inventory i left join inventory_features if on i."Id" = if."InventoryId"\
    join stock s on i."Id" = s."InventoryId"`,
  (res) => {
    const response = res.map(obj => {
      return obj = new
       DBResponseBuilder()
        .setId(obj.Id)
        .setCategory(null)
        .setName(obj.Name)
        .setDescription(obj.Description)
        .setUnitPrice(obj.UnitPrice)
        .setAmInStock(obj.AmInStock)
        .build();
    })
    return callback(response);
  });
}

const fetchQueryByFeatureValue = (value, callback) => {
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice",\
    s."AmInStock" from inventory i left join inventory_features if on i."Id" = if."InventoryId"\
    join stock s on i."Id" = s."InventoryId"\
    where if."Description" = '${value}'`,
  (res) => {
    const response = res.map(obj => {
      return obj = new
       DBResponseBuilder()
        .setId(obj.Id)
        .setCategory(null)
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
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice"\
    s."AmInStock", c."Name" as "Category" from inventory i join categories c on i."CategoryId" = c."Id"\
    join stock s on i."Id" = s."InventoryId"\
    where c."Name" = '${value}'`,
  (res) => {
    const response = res.map(obj => {
      return obj = new
       DBResponseBuilder()
        .setId(obj.Id)
        .setCategory(obj.Category)
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
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice",\
    s."AmInStock", c."Name" as "Category" from inventory i join categories c on i."CategoryId" = c."Id"\
    left join stock s on i."Id" = s."InventoryId"\
    where i."Id" = ${value}`,
  (res) => {
    const response = res.map(obj => {
      return obj = new
       DBResponseBuilder()
        .setId(obj.Id)
        .setCategory(obj.Category)
        .setName(obj.Name)
        .setDescription(obj.Description)
        .setUnitPrice(obj.UnitPrice)
        .setAmInStock(obj.AmInStock)
        .build();
    })
    return callback(response);
  });
}


// fetchQueryByFeatureValue('Brown', (result) => console.table(result));
// fetchQueryByCategory('Tent', (result) => console.table(result));

module.exports = {fetchInventory, fetchQueryByCategory, fetchQueryByFeatureValue, fetchQueryById};
