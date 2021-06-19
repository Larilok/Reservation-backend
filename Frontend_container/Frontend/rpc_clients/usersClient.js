'use strict'

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const path = require('path')

const usersServerAddress = 'users:80'

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

const login = credentials =>
  new Promise((res, rej) => {
    console.log('Login func Client', credentials)
    usersClient.Login(credentials, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.id)
    })
  })

const createLikedPost = likedPost =>
  new Promise((res, rej) => {
    console.log('Login func Client', likedPost)
    usersClient.CreateLikedPost(likedPost, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.id)
    })
  })

const deleteLikedPost = likedPost =>
  new Promise((res, rej) => {
    console.log('Login func Client', likedPost)
    usersClient.DeleteLikedPost(likedPost, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.id)
    })
  })

const getLikedPosts = userId =>
  new Promise((res, rej) => {
    console.log('Login func Client', userId)
    usersClient.GetLikedPost(userId, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.id)
    })
  })

const sendSMS = sendSMSInfo =>
  new Promise((res, rej) => {
    console.log('sendSMS func Client ', sendSMSInfo)
    usersClient.SendSMS(sendSMSInfo, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.data)
    })
  })

const validateSMSCode = validateInfo =>
  new Promise((res, rej) => {
    console.log('validateSMSCode func Client ', validateInfo)
    usersClient.ValidateSMSCode(validateInfo, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.data)
    })
  })

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
  updateField,
  login,
  createLikedPost,
  deleteLikedPost,
  getLikedPosts,
  sendSMS,
  validateSMSCode
}
