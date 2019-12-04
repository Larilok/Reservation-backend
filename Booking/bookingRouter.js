'use strict';

const fs = require('fs');
// const crypto = require('crypto');

const fsM = require('../fetchers/fetcherMain.js');


const route = (data, uri, callback) => {
  if(uri === '/book') {
    const detailsArr = data.split('&');
    let details = {};
    detailsArr.forEach(det => {
      let data = det.split('=');
      details[data[0]] = data[1];
    });
    console.log(details);
    //TODO ask DB to decrement and increment needed things in callback call callback
  }

  if(uri === '/booking.html') {
    fs.readFile('..'+uri, 'binary', (err, file) => callback(file));
  }
}

module.exports = {route};
