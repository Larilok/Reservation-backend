'use strict';

const {Pool} = require('pg');

const myPool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'architecture',
  user: 'postgres',
  password: 'password'
};

class dbAccess {
  constructor() {}
  getInstance(details) {
    if(! dbAccess.instance) {
      dbAccess.instance = new Pool(details);
    }
    return dbAccess.instance;
  }
};

class db {
  constructor(pool = myPool) {
    this.pool = new dbAccess().getInstance(pool);
  }
  query(text) {
    return this.pool.query(text, (err, res) => {
      if (err) {
        throw err;
      }
      // console.dir({ res });
      // console.table(res.fields);
      console.table(res.rows);
    });
  }
   close() {
    return this.pool.end();
   }
  getTable(table) {
    return this.query(`SELECT * from ${table}`);
  }
  getTableByValue(table, field, value) {
    return this.query(`SELECT * from ${table} WHERE ${field} = ${value}`);
  }
}

module.exports = db;
