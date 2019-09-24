'use strict';

const {Pool} = require('pg');

const myPool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'Architecture',
  user: 'postgres',
  password: '6545352misha'
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
  query(text, callback) {
    return this.pool.query(text, (err, res) => {
      if (err) {
        throw err;
      }
      // console.table(res.rows);
      return callback (res.rows);
    });
  }
  close() {
    return this.pool.end();
  }
<<<<<<< HEAD
  getTable(table, callback) {
    return this.query(`SELECT * from ${table}`, callback);
=======
  getTable(table) {
    this.pool.query(`SELECT * from ${table}`)
     .then(res => {
      const { rows } = res;
      console.table(rows);
      return rows;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      pool.end();
      
    });
>>>>>>> h
  }
  getTableByValue(table, field, value, callback) {
    return this.query(`SELECT * from ${table} WHERE "${field}" = ${value}`);
  }
}

module.exports = db;
