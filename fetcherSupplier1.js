'use strict';

let db = require('./db/db.js');
let DBResponseBuilder = require('./Builders/DBResponseBuilder.js');

const supplier1Pool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'supply',
  user: 'supplier',
  password: 'password'
};

let base = new db(supplier1Pool);

const fetchQueryByFeatureValue = (value, callback) => {
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice",\
    s."AmInStock" from inventory i join inventory_features if on i."Id" = if."InventoryId"\
    join stock s on i."Id" = s."InventoryId"\
    where if."Description" = '${value}'`,
  (res) => {
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
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice"\
    s."AmInStock" from inventory i join categories c on i."CategoryId" = c."Id"\
    join stock s on i."Id" = s."InventoryId"\
    where c."Name" = '${value}'`,
  (res) => {
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


fetchQueryByFeatureValue('White', (result) => console.table(result));
// fetchQueryByCategory('Tent', (result) => console.table(result));

module.exports = {fetchQueryByCategory, fetchQueryByFeatureValue};
