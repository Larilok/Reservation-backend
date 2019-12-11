'use strict';

const fs = require('fs');
const cli = require("../protos/client.js");
// const crypto = require('crypto');

const fsM = require('../fetchers/fetcherMain.js');


const route = (data, uri, callback) => {
  if(uri === '/book') {
    console.log('URI == BOOK');
    console.log(cli);
    console.log(data);
    console.log(callback.toString());
    cli.book({data: data}, callback);
    // cli.client.book({data: data}, callback);
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
    console.log('URI == SHOWBOOKING');
    cli.showbooking(callback);

  }

  if(uri === '/booking.html') {
    fs.readFile('..'+uri, 'binary', (err, file) => callback(file));
  }
  if(uri === '/bookingselect.html') {
    fs.readFile('..'+uri, 'binary', (err, file) => callback(file));
  }
};

module.exports = {route};
