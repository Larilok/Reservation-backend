//this is booking client

'use strict';

// const fs = require('fs');
// console.log(__dirname);
// fs.readdirSync(__dirname).forEach(file => {
//         console.log(file);
// });

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const serverAddress = '127.0.0.1:4250';

const proto = grpc.loadPackageDefinition(
    protoLoader.loadSync(__dirname + "\\route_guide.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

const client = new proto.RouteGuide(
    serverAddress,
    grpc.credentials.createInsecure()
);

// const book = client.book;

// client.book({data: '{a: "aaa", b: "bbb"}'}, (data) => {
//         console.log(data);
// });

const book = (call,  callback) => {
        console.log("In t function");
        console.log(callback.toString());
        client.book(call, callback);//.then(callback("Booked successfully"));
};

module.exports = {
        book,
        // client.book,
        // client
};