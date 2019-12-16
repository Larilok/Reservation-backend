//this is booking Server

'use strict';
console.log(__dirname);
// const services = require('./route_guide_grpc_pb');
const PROTO_PATH = __dirname + '/route_guide.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const pg = require('pg');
const crypto = require('crypto');
const fsM = require('../fetchers/fetcherMain.js');

const serverAddress = '127.0.0.1:4250';

const basePool = {
    host: '127.0.0.1',
    port: '5432',
    database: 'architecture',
    user: 'postgres',
    password: '6545352'
};

const base = new pg.Pool(basePool);

// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
// The protoDescriptor object has the full package hierarchy
const routeguide = protoDescriptor.RouteGuide;

const book = (call, callback) => {
    console.log('HERE');
    console.log(call.request.data);
    const detailsArr = call.request.data.split('&');
    let details = {};
    detailsArr.forEach(det => {
        let data = det.split('=');
        details[data[0]] = data[1];
    });
    console.log(details);
    base.query(`select * from inventory where "Id" = ${details.id}`, (resErr, res) => {
        // console.log(res);
        let price = 0;
        if(res.rows.length === 0) {
            // {
            //     Id: 1,
            //         CategoryId: 1,
            //     Name: 'BikeW8',
            //     Description: 'Great deal',
            //     UnitPrice: 2600
            // }
            // price = 1000;
            callback('', {data: "Item does not exist"});
            return;
        } else price = res.rows[0].UnitPrice;
        const now = new Date().toDateString();
        base.query(`insert into accounting
("InventoryId", "AmRented", "RentTime", "StartTime", "EndTime", "Price", "RenterName", "RenterSurname", "RenterPhone", "RenterCardDet")
values ('${details.id}', '${details.amount}', '${details.rentTime}', '${now}', '${now}', '${price}',
'${details.name}', '${details.surname}', '${details.phone}', '${details.card}')`, (insAnsErr, insAns) => {
            console.log('INSANS::');
            console.log(insAns);
            console.log('ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR::');
            console.log(insAnsErr);
            console.log(callback.toString());
            callback('', {data: "Inserted successfully"});
        });
    });
    // console.log(price);

    // return call;
};

const login = (call, callback) => {
    const detailsArr = call.request.data.split('&');
    let details = {};
    detailsArr.forEach(det => {
        let data = det.split('=');
        details[data[0]] = data[1];
    });
    const hash = crypto.createHash('sha256');
    hash.write(details.password + 'SecretSalt');
    hash.end();
    const password = hash.read().toString().replace(/'/g, "_");
    fsM.fetchUserByLogin(details.login, password, res => {
      // console.log('Found');
      console.log(res);
      if(res.length > 0) {
        //////////////////////////////////////////////GENERATE TOKEN
        callback('', {data: "User successfully logged in"});
      }
    })
};

const signup = (call, callback) => {
    const detailsArr = call.request.data.split('&');
    let details = {};
    detailsArr.forEach(det => {
        let data = det.split('=');
        details[data[0]] = data[1];
    });
    const hash = crypto.createHash('sha256');
    hash.write(details.password + 'SecretSalt');
    hash.end();
    const password = hash.read().toString().replace(/'/g, "_");
    fsM.addUser(details.login, password, 1, res => {
      if(res.length > 0) {
        //////////////////////////////////////////////GENERATE TOKEN
        callback('', {data: res});
      }
    });
};

const showbooking = (call, callback) => {
    fsM.fetchTableByValue(res => {
        console.log('IMPORTANT BIT');
        console.log(callback.toString());
        console.log(JSON.stringify(res));
        console.log(typeof JSON.stringify(res));
        callback('', {data: JSON.stringify(res)});
    });
    // callback('', {list: toRet});
};

const getServer = () => {
    const server = new grpc.Server();
    server.addService(routeguide.service , {
        book: book,
        showbooking: showbooking,
        login: login,
        signup: signup
    });
    server.bind(serverAddress, grpc.ServerCredentials.createInsecure());
    return server;
};

const server = getServer();
server.start();
console.log('Server running on', serverAddress);