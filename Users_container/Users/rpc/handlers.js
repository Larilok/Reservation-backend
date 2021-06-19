const {
  getCredentials,
  createUser,
  getUser,
  modifyField,
  removeUser,
  createLikedPost,
  deleteLikedPost,
  getLikedPosts
} = require('../db/queries')

const { validateSMSCode, sendSMS } = require('../sms/index')

const FAKE_ARGON2 =
  '$argon2i$v=19$m=4096,t=3,p=1$P7WDeMgGqZikuTLIh2p9vA$6w9CAQpiMCx7CLLhrftHjkP66OVZjuYuVprbm2znUeo'

const login = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const { phone, password } = call.request
    const user = await getCredentials(phone)

    if (!user) {
      console.log('Wrong Login')
      //timebase attacks protection
      await argon2.verify(FAKE_ARGON2, password)

      callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Login or password is incorrect'
      })
    }
    const { id: id, password: userPassword } = user

    console.log('User password', userPassword)

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

const createUserRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await createUser(call.request)

    console.log(result)
    callback(null, { data: 'Created' })
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'create user error'
    })
  }
}

const getUserRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const user = await getUser(call.request)

    console.log(user)
    callback(null, user)
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'get user error'
    })
  }
}

const updateFieldRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await modifyField(call.request)

    console.log(result)
    callback(null, { data: 'Created' })
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'modify field error'
    })
  }
}

const removeUserRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await removeUser(call.request)

    console.log(result)
    callback(null, { data: 'Removed User' })
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'remove user error'
    })
  }
}

const createLikedPostRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await createLikedPost(call.request)

    console.log(result)
    callback(null, { data: 'Created' })
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'create user error'
    })
  }
}

const deleteLikedPostRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await deleteLikedPost(call.request)

    console.log(result)
    callback(null, { data: 'Created' })
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'create user error'
    })
  }
}

const getLikedPostsRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await getLikedPosts(call.request)

    console.log(result)
    callback(null, { data: 'Created' })
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'create user error'
    })
  }
}

const sendSMSRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await sendSMS(call.request)

    console.log(result)
    callback(null, { data: 'Created' })
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'create user error'
    })
  }
}

const validateSMSCodeRPC = async (call, callback) => {
  console.log('Request: ', call.request)
  try {
    const result = await validateSMSCode(call.request)

    console.log(result)
    callback(null, { data: 'OK' })
  } catch (err) {
    console.log(err)
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'validate code error'
    })
  }
}

module.exports = {
  createUserRPC,
  getUserRPC,
  updateFieldRPC,
  removeUserRPC,
  login,
  sendSMSRPC,
  validateSMSCodeRPC,
  createLikedPostRPC,
  deleteLikedPostRPC,
  getLikedPostsRPC
}
