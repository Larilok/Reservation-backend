'use strict';

// const services = require('./route_guide_grpc_pb');
const PROTO_PATH = './route_guide.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const serverAddress = '127.0.0.1:4250';

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


const getServer = () => {
    const server = new grpc.Server();
    server.addService(routeguide.RouteGuide.service , {

    });
    server.bind(serverAddress, grpc.ServerCredentials.createInsecure());
    return server;
};
