'use strict'

const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")
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

const login = (credentials) => new Promise((res, rej) => {
  console.log('Login func Client')
  authClient.login(credentials, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err)
      return
    }
    console.log(resp)
    res(resp.result)
  })
})

const signup = (signupInfo) => new Promise((res, rej) => {
  console.log(`SignUp func Client ${signupInfo}`)
  authClient.signup(signupInfo, (err, resp) => {
    if (err) {
      console.log("Error: ", err)
      rej(err)
      return
    }
    res(resp)
  })
})

module.exports = {
  login,
  signup
}
