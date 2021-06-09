'use strict'

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const {
  login,
  signup,
  createSessionRPC,
  deleteSessionRPC,
  getSessionRPC,
  updateSessionRPC
} = require('./rpc/handlers')

const PROTO_PATH = __dirname + '/auth.proto'

const serverAddress = 'localhost:4240'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const authService = protoDescriptor.AuthService

const getServer = () => {
  const server = new grpc.Server()
  server.addService(authService.service, {
    login: login,
    signup: signup,
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
