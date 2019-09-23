'use strict';

const {Pool} = require('pg');

const pool = {
  host: '127.0.0.1',
  port: '5432',
  database: 'architecture',
  user: 'postgres',
  password: 'postgres'
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
  constructor(pool) {
    this.pool = new dbAccess(pool);
  }
}

module.exports = db;
