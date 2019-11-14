'use strict';

const main = require('../fetchers/fetcherMain.js');
const f1 = require('../fetchers/fetcherSupplier1.js');
const f2 = require('../fetchers/fetcherSupplier2.js');

// let s1Inv = [];
// let s2Inv = [];

let cache = {
  mainInv: [],
  s1Inv: [],
  s2Inv: []
}

const makeCache = (callback) => {
  let mainP = new Promise((res, rej) => {
    getMainCache((status) => res(status));
  });
  let s1P = new Promise((res, rej) => {
    getSupplier1Cache((status) => res(status));
  });
  let s2P = new Promise((res, rej) => {
    getSupplier2Cache((status) => res(status));
  });
  Promise.all([mainP, s1P, s2P]).then(() => {callback()});
  // Promise.all([s1P, s2P]).then(() => {callback(s1Inv); callback(s2Inv)});
}

const dropCache = (callback) => {
  cache.mainInv = [];
  cache.s1Inv = [];
  cache.s2Inv = [];
  callback();
}

const getMainCache = (callback) => {
  main.fetchInventory((res) => {
    cache.mainInv = res;
    callback(1);
  })
}

const getSupplier1Cache = (callback) => {
  f1.fetchInventory((res) => {
    cache.s1Inv = res;
    callback(1);
  });
}

const getSupplier2Cache = (callback) => {
  let stop = 0;
  let promises = [];//[new Promise((res, rej) => setTimeout(() => res(1), 1000))];
  for (let i = 1;i !== 100; i++) {
    promises.push(new Promise((res, rej) => {
      f2.fetchInventoryPage(i, (result) => {
        if(result.length === 0) {
          res(2);
          // stop = 1;
        }
        else {
          cache.s2Inv = cache.s2Inv.concat(result);
          res(1);
        }
      });
    }));

  }
  Promise.all(promises).then(() => callback(1));
}

// console.table(s1);

// cache(console.table);


module.exports = {cache, dropCache, makeCache};
