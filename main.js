'use strict';

let db = require('./db.js');

// const fields = ['schemaname', 'tablename', 'tableowner'].join(', ');
// const sql = `SELECT ${fields} FROM pg_tables WHERE tableowner = $1 and schemaname = $2`;
let base = new db();
// console.log(base.query('SELECT * from inventory'));
let sql = 'SELECT * from inventory';
base.query(sql);
base.getTable('inventory');
base.getTableByValue('inventory', 'InventoryID', 1);
base.close();
// console.log(db);

