'use strict'

const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const path = require('path')

const usersServerAddress = 'reservation-web-application_users_1:4243'

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(path.resolve(__dirname, '../protos/users.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)

const usersClient = new proto.UsersService(
  usersServerAddress,
  grpc.credentials.createInsecure()
)

const createUser = (userInfo) => new Promise((res, rej) => {
  console.log('createUser func Client')
  usersClient.CreateUser(userInfo, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err)
      return
    }
    console.log(resp)
    res(resp)
  })
})

const getUser = (id) => new Promise((res, rej) => {
  console.log('getUsre func Client')
  usersClient.GetUser({ id: id }, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err)
      return
    }
    console.log(resp)
    res(resp)
  })
})

const removeUser = (id) => new Promise((res, rej) => {
  console.log('removeUser func Client')
  usersClient.RemoveUser({ id }, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err)
      return
    }
    console.log(resp)
    res(resp)
  })
})

const modifyField = (modifyUserInfo) => new Promise((res, rej) => {
  console.log('getPost func Client')
  usersClient.ModifyField(modifyUserInfo, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err)
      return
    }
    console.log(resp)
    res(resp.result)
  })
})

module.exports = {
  createUser,
  getUser,
  removeUser,
  modifyField
}