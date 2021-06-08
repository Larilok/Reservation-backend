const argon2 = require('argon2')
const { getUser } = require('../db/queries')
const grpc = require('@grpc/grpc-js')

const TOKEN_LENGTH = 80
const ALPHA_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ALPHA_LOWER = 'abcdefghijklmnopqrstuvwxyz'
const ALPHA = ALPHA_UPPER + ALPHA_LOWER
const DIGIT = '0123456789'
const ALPHA_DIGIT = ALPHA + DIGIT

const FAKE_ARGON2 =
  '$argon2i$v=19$m=4096,t=3,p=1$P7WDeMgGqZikuTLIh2p9vA$6w9CAQpiMCx7CLLhrftHjkP66OVZjuYuVprbm2znUeo'
const VERSION = 1

const login = async (call, callback) => {
  console.log(call.request)
  const { email, password } = call.request
  try {
    const { id: id, password: userPassword } = await getUser({ email })

    console.log('User password', userPassword)

    if (!userPassword) {
      console.log('Wrong login')
      //timebase attacks protection
      await argon2.verify(FAKE_ARGON2, stringToArray(password))

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
  try {
    const { email, password } = call.request
    const { password: userPassword } = await getUser({ email })

    if (userPassword) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'User already exists'
      })
      return
    }
    const hashedPassword = await argon2.hash(password)

    callback(null, { password: hashedPassword })
  } catch (err) {
    console.log(err)
  }
}

const stringToArray = str => {
  const array = str.split(',').map(v => Number(v))
  return Buffer.from(array)
}

module.exports = {
  login,
  signup
}
