'use strict';

let db = require('./db.js');

let base = new db();

let sql = 'SELECT * from inventory';
base.query(sql);
base.getTable('inventory');
base.getTableByValue('inventory', 'InventoryID', 1);
base.close();
// console.log(db);

