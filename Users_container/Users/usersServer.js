'use strict'

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const {
  createUserRPC,
  removeUserRPC,
  updateFieldRPC,
  getUserRPC,
  login,
  sendSMSRPC,
  validateSMSCodeRPC,
  createLikedPostRPC,
  deleteLikedPostRPC,
  getLikedPostsRPC
} = require('./rpc/handlers')

const PROTO_PATH = __dirname + '/users.proto'
const serverAddress = '0.0.0.0:4243'

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

const usersService = protoDescriptor.UsersService

const getServer = () => {
  const server = new grpc.Server()
  server.addService(usersService.service, {
    CreateUser: createUserRPC,
    RemoveUser: removeUserRPC,
    GetUser: getUserRPC,
    UpdateField: updateFieldRPC,
    Login: login,
    CreateLikedPost: createLikedPostRPC,
    DeleteLikedPost: deleteLikedPostRPC,
    GetLikedPosts: getLikedPostsRPC,
    SendSMS: sendSMSRPC,
    ValidateSMSCode: validateSMSCodeRPC
  })
  return server
}

const server = getServer()

server.bindAsync(serverAddress, grpc.ServerCredentials.createInsecure(), () => {
  server.start()
  console.log('Server running on', serverAddress)
})
