'use strict'

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const path = require('path')

const usersServerAddress = 'users-service:80'

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

const createUser = newUser =>
  new Promise((res, rej) => {
    console.log('createUser func Client ', newUser)
    usersClient.CreateUser(newUser, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.data)
    })
  })

const getUser = userId =>
  new Promise((res, rej) => {
    console.log('getUser func Client ', userId)
    usersClient.GetUser(userId, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp)
    })
  })

const removeUser = userId =>
  new Promise((res, rej) => {
    console.log('removeUser func Client ', userId)
    usersClient.RemoveUser(userId, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.data)
    })
  })

const updateField = updateUserInfo =>
  new Promise((res, rej) => {
    console.log('updateField func Client ', updateUserInfo)
    usersClient.UpdateField(updateUserInfo, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.data)
    })
  })

module.exports = {
  createUser,
  getUser,
  removeUser,
  updateField
}
