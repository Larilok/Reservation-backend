'use strict';

const fs = require('fs');
const crypto = require('crypto');

const fsM = require('../fetchers/fetcherMain.js');


const route = (data, uri, callback) => {
  if(uri === '/login') {
    const detailsArr = data.split('&');
    let details = {};
    detailsArr.forEach(det => {
      let data = det.split('=');
      details[data[0]] = data[1];
    });
    const hash = crypto.createHash('sha256');
    hash.write(details.password + 'SecretSalt');
    // console.log('Hash');
    hash.end();
    const password = hash.read().toString().replace(/'/g, "_");
    // console.log(password);
    fsM.fetchUserByLogin(details.login, password, res => {
      // console.log('Found');
      console.log(res);
      if(res.length > 0) {
        //////////////////////////////////////////////GENERATE TOKEN

        callback(JSON.stringify('User successfully logged in'));
      }
    })
  }
  if(uri === '/signup') {//add admins? WTF does tttt tttt on signup crash everything?????
    const detailsArr = data.split('&');
    let details = {};
    detailsArr.forEach(det => {
      let data = det.split('=');
      details[data[0]] = data[1];
    });
    console.log(details);
    const hash = crypto.createHash('sha256');
    hash.write(details.password + 'SecretSalt');
    // console.log('Hash');
    hash.end();
    const password = hash.read().toString().replace(/'/g, "_");
    console.log(password);
    console.log('ADDING');
    fsM.addUser(details.login, password, 1, res => {
      callback(JSON.stringify(res));
    });
    //privileges: 1 - User, 2- Admin
  }
  if(uri === '/signup.html') {
    fs.readFile('..'+uri, 'binary', (err, file) => callback(file));
  }
  if(uri === '/login.html') {
    fs.readFile('..'+uri, 'binary', (err, file) => callback(file));
  }

};

module.exports = {route};
