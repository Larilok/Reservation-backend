'use strict';

let db = require('./db/db.js');

const supplier1Pool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'supply',
  user: 'supplier',
  password: 'password'
};

let base = new db(supplier1Pool);

const fetchQueryByFeatureValue = (value, callback) => {
  let raw;
  return base.query(`select distinct i."Id", i."Name", i."Description", i."UnitPrice"\
    s."AmInStock" from inventory i join inventory_features if on i."Id" = if."InventoryId"\
    join stock s on i."Id" = s."InventoryId"\
  where if."Description" = '${value}'`,
  (res) => {
    raw = res.map(obj => {
      return obj =
       DBResponseBuilder()
        .setId(obj.Id)
        .setName(obj.Name)
        .setDescription(obj.Description)
        .setUnitPrice(obj.UnitPrice)
        .setAmInStock(obj.AmInStock)
        .build();
    })
    return callback(raw);
  });
}

const fetchQueryByCategory = (value, callback) => {
  const raw = base.query(`select distinct i."Name",\
  i."Description", i."UnitPrice" from inventory i\
  join categories c on i."CategoryId" = c."Id" where c."Name" = '${value}'`, callback);
  return raw;
}


// fetchQueryByFeatureValue('White', (result) => console.table(result));
// fetchQueryByCategory('Tent', (result) => console.table(result));

