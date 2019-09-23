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
    this.pool.query(text);
  }
}

module.exports = db;
