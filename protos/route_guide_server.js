//this is booking Server

'use strict';

// const services = require('./route_guide_grpc_pb');
const PROTO_PATH = './route_guide.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const pg = require('pg');

const serverAddress = '127.0.0.1:4250';

const basePool = {
    host: '127.0.0.1',
    port: '5432',
    database: 'architecture',
    user: 'postgres',
    password: 'password'
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
    console.log(call.request.data);
    const detailsArr = call.request.data.split('&');
    let details = {};
    detailsArr.forEach(det => {
        let data = det.split('=');
        details[data[0]] = data[1];
    });
    console.log(details);
    const price = base.query(`select * from inventory where "Id" = ${details.id}`);
    const now = new Date().toDateString();
    console.log(price);
//     base.query(`insert into accounting
// ("Id", "InventoryId", "AmRented", "RentTime", "StartTime", "EndTime", "Price", "RenterName", "RenterSurname", "RenterPhone", "RenterCardDet")
// values ('${details.id}', '${details.id}', '${details.ammount}', '${details.rentTime}', '${now}', '${now}', '${price}, '${details.name}', '${details.surname}', '${details.phone}', '${details.card}'')`);
    callback("Inserted successfully");
    // return call;
};

// const showbooking = () => {
//
// };

const getServer = () => {
    const server = new grpc.Server();
    server.addService(routeguide.service , {
        book: book,
        // showbooking: showbooking
    });
    server.bind(serverAddress, grpc.ServerCredentials.createInsecure());
    return server;
};

const server = getServer();
server.start();
console.log('Server running on', serverAddress);