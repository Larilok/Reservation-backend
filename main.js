'use strict';

let dba = require('./db.js');

let db = new dba.dbAccess().getInstance(dba.pool);

console.log(db);
