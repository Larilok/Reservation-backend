const argon2 = require('argon2')
const {
  getCredentials,
  createCredentials,
  createSession,
  deleteSession,
  getSession,
  updateSession
} = require('../db/queries')
const grpc = require('@grpc/grpc-js')

const FAKE_ARGON2 =
  '$argon2i$v=19$m=4096,t=3,p=1$P7WDeMgGqZikuTLIh2p9vA$6w9CAQpiMCx7CLLhrftHjkP66OVZjuYuVprbm2znUeo'
const VERSION = 1

const login = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const { email, password } = call.request
    const { id: id, password: userPassword } = await getCredentials(email)

    console.log('User password', userPassword)

    if (!userPassword) {
      console.log('Wrong login')
      //timebase attacks protection
      await argon2.verify(FAKE_ARGON2, password)

      callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Login or password is incorrect'
      })
    }

    const isPasswordValid = await argon2.verify(userPassword, password)
    if (!isPasswordValid) {
      console.log('Wrong password')
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Login or password is incorrect'
      })
      return
    }

    callback(null, { id: id })
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Login or password is incorrect'
    })
  }
}

const signup = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const { email, password } = call.request
    const { password: userPassword } = await getCredentials(email)

    if (userPassword) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'User already exists'
      })
      return
    }
    const hashedPassword = await argon2.hash(password)

    const idObj = await createCredentials({ email, password: hashedPassword })

    callback(null, idObj)
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'User already exists'
    })
  }
}

const createSessionRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await createSession(call.request)

    console.log(result)
    callback(null, 'Created')
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Session creation error'
    })
  }
}

const deleteSessionRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await deleteSession(call.request)

    console.log(result)
    callback(null, 'Deleted')
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Session deletion error'
    })
  }
}

const getSessionRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const session = await getSession(call.request)

    console.log(session)
    callback(null, session)
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Session get error'
    })
  }
}

const updateSessionRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await updateSession(call.request)

    console.log(result)
    callback(null, 'Updated')
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Session update error'
    })
  }
}

module.exports = {
  login,
  signup,
  createSessionRPC,
  deleteSessionRPC,
  updateSessionRPC,
  getSessionRPC
}
