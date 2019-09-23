'use strict';

let db = require('./db.js');

// let db = new dba.dbAccess().getInstance(dba.pool);

<<<<<<< HEAD
// console.log(db);
=======
const fields = ['schemaname', 'tablename', 'tableowner'].join(', ');
const sql = `SELECT ${fields} FROM pg_tables WHERE tableowner = $1 and schemaname = $2`;
db.query(sql, ['postgres', 'public'], (err, res) => {
  if (err) {
    throw err;
  }
  console.dir({ res });
  console.table(res.fields);
  console.table(res.rows);
  db.end();
});
// console.log(db);

>>>>>>> Succes sql
