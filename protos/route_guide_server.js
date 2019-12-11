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
        console.log(res);
        const price = res.rows[0].UnitPrice;
        base.query(`insert into accounting
("InventoryId", "AmRented", "RentTime", "StartTime", "EndTime", "Price", "RenterName", "RenterSurname", "RenterPhone", "RenterCardDet")
values ('${details.id}', '${details.amount}', '${details.rentTime}', '${now}', '${now}', '${price}',
'${details.name}', '${details.surname}', '${details.phone}', '${details.card}')`, (insAnsErr, insAns) => {
            console.log('INSANS::');
            console.log(insAns);
            console.log('ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR::');
            console.log(insAnsErr);
            console.log(callback.toString());
            callback('', JSON.stringify("Inserted successfully"));
        });
    });
    const now = new Date().toDateString();
    // console.log(price);

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