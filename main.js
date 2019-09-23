'use strict';

let db = require('./db.js');

// const fields = ['schemaname', 'tablename', 'tableowner'].join(', ');
// const sql = `SELECT ${fields} FROM pg_tables WHERE tableowner = $1 and schemaname = $2`;
let base = new db();
// console.log(base.query('SELECT * from inventory'));
let sql = 'SELECT * from inventory';
base.query(sql, (err, res) => {
  if (err) {
    throw err;
  }
  console.dir({ res });
  console.table(res.fields);
  console.table(res.rows);
  base.end();
});
// console.log(db);

