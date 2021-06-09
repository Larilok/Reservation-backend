'use strict'

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

const authServerAddress = 'reservation-web-application_auth_1:4240'

const proto = grpc.loadPackageDefinition(
  protoLoader.loadSync(path.resolve(__dirname, '../protos/auth.proto'), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
)

const authClient = new proto.AuthService(
  authServerAddress,
  grpc.credentials.createInsecure()
)

const login = credentials =>
  new Promise((res, rej) => {
    console.log('Login func Client', credentials)
    authClient.Login(credentials, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.id)
    })
  })

const signup = credentials =>
  new Promise((res, rej) => {
    console.log(`SignUp func Client `, credentials)
    authClient.Signup(credentials, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.id)
    })
  })

const createSession = newSession =>
  new Promise((res, rej) => {
    console.log(`CreateSession func Client `, newSession)
    authClient.CreateSession(newSession, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.result)
    })
  })

const getSession = sessionToken =>
  new Promise((res, rej) => {
    console.log(`getSession func Client ${sessionToken}`)
    authClient.GetSession(sessionToken, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp)
    })
  })

const updateSession = newSession =>
  new Promise((res, rej) => {
    console.log(`updateSession func Client }`, newSession)
    authClient.UpdateSession(newSession, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.result)
    })
  })

const deleteSession = sessionToken =>
  new Promise((res, rej) => {
    console.log(`deleteSession func Client ${sessionToken}`)
    authClient.DeleteSession(sessionToken, (err, resp) => {
      if (err) {
        console.log('Error: ', err)
        rej(err.message)
        return
      }
      console.log(resp)
      res(resp.result)
    })
  })
module.exports = {
  login,
  signup,
  createSession,
  updateSession,
  deleteSession,
  getSession
}
