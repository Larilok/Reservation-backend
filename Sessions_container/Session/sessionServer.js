'use strict'

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const {
  createSessionRPC,
  deleteSessionRPC,
  getSessionRPC,
  updateSessionRPC
} = require('./rpc/handlers')

const PROTO_PATH = __dirname + '/sessions.proto'

const serverAddress = '0.0.0.0:4240'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const sessionsService = protoDescriptor.SessionsService

const getServer = () => {
  const server = new grpc.Server()
  server.addService(sessionsService.service, {
    CreateSession: createSessionRPC,
    GetSession: getSessionRPC,
    UpdateSession: updateSessionRPC,
    DeleteSession: deleteSessionRPC
  })
  return server
}

const server = getServer()

server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), () => {
  server.start()
  console.log('Server running on', serverAddress)
})
