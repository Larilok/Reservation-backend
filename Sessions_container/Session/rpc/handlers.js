const {
  createSession,
  deleteSession,
  getSession,
  updateSession
} = require('../db/queries')
const grpc = require('@grpc/grpc-js')

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
  createSessionRPC,
  deleteSessionRPC,
  updateSessionRPC,
  getSessionRPC
}
