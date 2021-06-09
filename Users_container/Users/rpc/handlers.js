const {
  createUser,
  getUser,
  modifyField,
  removeUser
} = require('../db/queries')

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

const modifyFieldRPC = async (call, callback) => {
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

module.exports = {
  createUserRPC,
  getUserRPC,
  modifyFieldRPC,
  removeUserRPC
}
