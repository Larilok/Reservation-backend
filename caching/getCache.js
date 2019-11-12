'use strict';

const f1 = require('../fetchers/fetcherSupplier1.js');
const f2 = require('../fetchers/fetcherSupplier2.js');

let s1 = f1.fetchInventory();
let s2 = f2.fetchInventory();

// console.table(s1);


module.exports = {s1, s2};
