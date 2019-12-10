'use strict';

const fs = require('fs');
const cli = require("../protos/client.js");
// const crypto = require('crypto');

const fsM = require('../fetchers/fetcherMain.js');


const route = (data, uri, callback) => {
  if(uri === '/book') {
    cli.book(data, callback);
  //   const detailsArr = data.split('&');
  //   let details = {};
  //   detailsArr.forEach(det => {
  //     let data = det.split('=');
  //     details[data[0]] = data[1];
  //   });
  //   console.log(details);
  //   //TODO ask DB to decrement and increment needed things in callback call callback
  }
  if(uri === '/showbooking') {
    //unretItems
    //TODO ask DB to decrement and increment needed things in callback call callback
  }

  if(uri === '/booking.html') {
    fs.readFile('..'+uri, 'binary', (err, file) => callback(file));
  }
  if(uri === '/bookingselect.html') {
    fs.readFile('..'+uri, 'binary', (err, file) => callback(file));
  }
}

module.exports = {route};
